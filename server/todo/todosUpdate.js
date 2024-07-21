import mongoose from "mongoose"
import TodoSchema from "./todoSchema.js"

const todosUpdate = async (req, res) => {
  const { id } = req.params
  const { _id, text, type } = req.body
  console.log(id, _id, text, type)
  // Create Todo model
  const Todos = mongoose.model("Todos", TodoSchema)
  // Update todo
  try {
    await Todos.findByIdAndUpdate({ _id: _id }, {
      text, type
    })
    res.status(200).json([{ message: "Todo was successfully updated." }])
  }
  catch (err) {
    res.status(200).json({ error: "There was an error updating the todo."})
  }
}

export default todosUpdate