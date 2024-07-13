import 'dotenv/config'
import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'

import { socketService } from './services/socket.service.js'
import { blockRoutes } from './api/block/block.routes.js'


const app = express()
const server = http.createServer(app)

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://localhost:5173',
        ],
        credentials: true, 
    }
    app.use(cors(corsOptions))
}

app.use('/api/blocks', blockRoutes)
socketService.setupSocketAPI(server)

//TODO: Un-comment after build
// app.get('/**', (req, res) => { 
//     res.sendFile(path.resolve('public/index.html'))
//   })

const port = process.env.PORT || 3030
server.listen(port, () => {
    console.log('Server is running on port:' + port)
})