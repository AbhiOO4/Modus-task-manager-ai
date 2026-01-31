
import express from 'express'

import dotenv from 'dotenv'

import connectDB from './config/db.js'

import tasksRoutes from './routes/tasksRoutes.js'

import authRoutes from './routes/authRoutes.js'

dotenv.config({ quiet: true })

const app = express()

app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is running on port 3000")
    })
})

