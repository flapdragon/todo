import mongoose from "mongoose"
import TodoSchema from "./todoSchema.js"

const todosCreate = async (req, res) => {
  const { text, type } = req.body
  // Create Todo model
  const Todos = mongoose.model("Todos", TodoSchema)
  // Create todo
  try {
    const newTodo = await Todos.create({
      text, type
    })
    res.status(200).json(newTodo)
  }
  catch (err) {
    res.status(200).json({ error: "There was an error creating the todo."})
  }
}

export default todosCreate