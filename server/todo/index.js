import express from 'express'
import todoGetAll from './todoGetAll.js'
import todosCreate from './todosCreate.js'
import todosUpdate from './todosUpdate.js'
import todosDelete from './todosDelete.js'

// Create router instance
const todoRouter = express.Router()

// Get all Todos
todoRouter.get("/", todoGetAll)
// Create one todo
todoRouter.post("/", todosCreate)
// Update one todo
todoRouter.put("/:id", todosUpdate)
// Delete one todo
todoRouter.delete("/:id", todosDelete)

export default todoRouter
