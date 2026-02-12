
import express from 'express'

import dotenv from 'dotenv'

import connectDB from './config/db.js'

import tasksRoutes from './routes/tasksRoutes.js'

import authRoutes from './routes/authRoutes.js'

import cors from 'cors'

dotenv.config({ quiet: true })

const app = express()

app.use(cors({
        origin: "http://localhost:5173"
    }))

app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)


connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running on port ", process.env.PORT)
    })
})

