import express from 'express'
import dotenv from 'dotenv'
import { checkPort } from './scanner.js'
import { validatePort } from './validator.js'
import cors from 'cors'

dotenv.config()

const server = express()
const PORT = process.env.PORT || 3000

server.use(cors())

server.get('/', (req, res) => {
    res.send('Port Checker API running')
})

server.get('/checkport', async (req, res) => {
    try {
        const port = parseInt(req.query.port)

   
        if (!validatePort(port)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid port'
            })
        }

    
        let ip

        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(',')[0]
        } else {
            ip = req.socket.remoteAddress.split(',')[3]
        }

        const status = await checkPort(ip, port)

        res.json({
            success: true,
            ip,
            port,
            status
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

server.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})