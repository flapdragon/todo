import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import todoRouter from './todo/index.js'

const app = express()
app.use(cors()) // Use CORS so students can connect and submit
app.use(express.json()) // Parse request body as JSON
const port = 8000

// MongoDB
const mongoURL = process.env.MONGO_URI || ""
mainDB().catch((err) => console.log(err))
async function mainDB() {
  await mongoose.connect(mongoURL)
  console.log(`Connected to ${mongoURL}`)
}

// Route
app.get('/', (req, res) => {
  res.status(200).json({ "message": "Hello World!" })
})

// Todo routes
app.use('/todos', todoRouter)

// Server
app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})