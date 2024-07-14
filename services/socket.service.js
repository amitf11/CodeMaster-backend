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
            handleJoin(socket, blockId)
        })

        socket.on('codeChange', ({ blockId, code }) => {
            socket.to(blockId).emit('codeUpdate', code)
        })

        socket.on('challengeSuccess', (blockId) => {
            socket.to(mentors[blockId]).emit('studentSuccess')
        })

        socket.on('leave', (blockId) => {
            handleLeave(socket, blockId)
        })

        socket.on('disconnect', (blockId) => {
            handleDisconnect(socket, blockId)
        })
    })
}

function handleJoin(socket, blockId) {
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
}

function handleLeave(socket, blockId) {
    socket.leave(blockId)

    if (mentors[blockId] === socket.id) {
        delete mentors[blockId]
        console.log(`Mentor ${socket.id} left block ${blockId}`)
        gIo.to(blockId).emit('mentorLeft')
    }

    updateUsersCount(blockId)
}

function handleDisconnect(socket, blockId) {
    socket.leave(blockId)

    for (const blockId in mentors) {
        if (mentors[blockId] === socket.id) {
            delete mentors[blockId]
            console.log(`Mentor ${socket.id} left block ${blockId}`)
            gIo.to(blockId).emit('mentorLeft')
        }
    }
}

function updateUsersCount(blockId) {
    const room = gIo.sockets.adapter.rooms.get(blockId)
    const usersCount = room ? room.size : 0
    gIo.to(blockId).emit('updateUsers', usersCount)
}