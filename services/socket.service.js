import { Server } from "socket.io"

export const socketService = {
    setupSocketAPI
}

var gIo = null
const mentors = {}

function setupSocketAPI(server) {
    gIo = new Server(server, {
        cors: {
            origin: '*'
        }
    })

    gIo.on('connection', (socket) => {
        console.log('A user connected')

        socket.on('join', (blockId) => {
            socket.join(blockId)
            console.log(`User ${socket.id} joined block ${blockId}`)

            // Check if the block already has a mentor
            if (!mentors[blockId]) {
                mentors[blockId] = socket.id
                socket.emit('setRole', 'mentor')
                console.log(`User ${socket.id} is assigned as the mentor for block ${blockId}`)
            } else {
                socket.emit('setRole', 'student')
                console.log(`User ${socket.id} is assigned as a student for block ${blockId}`)
            }

            updateUsersCount(blockId)
        })

        socket.on('leave', (blockId) => {
            socket.leave(blockId)

            if (mentors[blockId] === socket.id) {
                delete mentors[blockId]
                console.log(`Mentor ${socket.id} left block ${blockId}`)
                gIo.to(blockId).emit('mentorLeft')
                console.log('mentors:', mentors)
            }

            updateUsersCount(blockId)
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })
}

function updateUsersCount(blockId) {
    const room = gIo.sockets.adapter.rooms.get(blockId)
    const usersCount = room ? room.size : 0
    gIo.to(blockId).emit('updateUsers', usersCount)
}