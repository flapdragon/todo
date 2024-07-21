import mongoose from "mongoose"
import TodoSchema from "./todoSchema.js"

const todosDelete = async (req, res) => {
  const { id } = req.params
  // Create Todo model
  const Todos = mongoose.model("Todos", TodoSchema)
  // Update todo
  try {
    await Todos.deleteOne({ _id: id })
    res.status(200).json([{ message: "Todo was successfully deleted." }])
  }
  catch (err) {
    res.status(200).json({ error: "There was an error deleting the todo."})
  }
}

export default todosDelete