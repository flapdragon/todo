import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TodoSchema = new Schema({
  text: String,
  type: String
})

export default TodoSchema