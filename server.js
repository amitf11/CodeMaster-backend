import http from 'http'
import path from 'path'
import cors from 'cors'
import fs from 'fs' //TODO: Remove this when moving to DB
import express from 'express'
import cookieParser from 'cookie-parser'

import { socketService } from './services/socket.service.js'

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
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


//End-points
app.get('/api/blocks', async (req, res) => {
    fs.readFile(('data/blocks.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file')
      return
    }
    res.json(JSON.parse(data))
  })
})

app.get('/api/blocks/:id', async (req, res) => { //TODO: update when moving to DB
    fs.readFile(('data/blocks.json'), 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Error reading file')
          return
        }

        const blocks = JSON.parse(data)
        const block = blocks[req.params.id - 1] 
        if (!block) {
          res.status(404).send('Code block not found')
          return
        }
        res.json(block)
      })
})

socketService.setupSocketAPI(server)

// app.get('/**', (req, res) => {
//     res.sendFile(path.resolve('public/index.html'))
//   })

const port = process.env.PORT || 3030
server.listen(port, () => {
    console.log('Server is running on port:' + port)
})