
import express from 'express'

import dotenv from 'dotenv'

import connectDB from './config/db.js'

import tasksRoutes from './routes/tasksRoutes.js'

import authRoutes from './routes/authRoutes.js'

import helmet from 'helmet'

import cors from 'cors'

import cookieParser from 'cookie-parser'

dotenv.config({ quiet: true })

const app = express()

app.use(cors({
        origin: "https://modus-task-manager-frontend.onrender.com",
        credentials: true
    }))

app.use(helmet())

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)


connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running on port ", process.env.PORT)
    })
})

