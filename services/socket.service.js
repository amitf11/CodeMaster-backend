import { Server } from "socket.io"

var gIo = null

export const socketService = {
    setupSocketAPI
}

function setupSocketAPI(server) {
    gIo = new Server(server, {
        cors: {
            origin: '*'
        }
    })

    gIo.on('connection', (socket) => {
        console.log('A user connected')

        socket.on('join', ({ blockId, role }) => {
            socket.join(blockId)
            console.log(`${role} joined code block ${blockId}`)
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })
}