import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/questions.js'
import answerRoutes from './routes/answer.js'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'


const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: __dirname + '/.env' })
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is a stackoverflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000

const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })).catch(err => { console.log(err.message) })