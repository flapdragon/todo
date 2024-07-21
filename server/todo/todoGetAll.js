import mongoose from "mongoose"
import TodoSchema from "./todoSchema.js"

const todoGetAll = async (req, res) => {
    // Create Todo
    const Todos = mongoose.model("Todos", TodoSchema)
    // Get all todos
    const todosAll = await Todos.find()
    console.log("todosAll")
    console.log(todosAll)
    res.status(200).json(todosAll)
}

export default todoGetAll