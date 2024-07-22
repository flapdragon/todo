import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [ todo, setTodo ] = useState("")
  const [ todos, setTodos ] = useState([{}])
  const [ updateButton, setUpdateButton ] = useState({ updated: false, id: "" })


  const server = "http://localhost:8000"

  // Get all todos
  useEffect(() => {
    axios
      .get(`${server}/todos`)
      .then(function (response) {
        setTodos(response.data)
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }, [])

  // // Clear update button success after 3 seconds
  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   //   console.log('This will be called every 2 seconds')
  //   //   setUpdateButton({ updated: false, id: "" })
  //   // }, 3000)
  
  //   // return () => clearInterval(interval)
  //   const timer = setTimeout(() => {
  //     console.log('This will be called every 3 seconds')
  //     setUpdateButton({ updated: false, id: "" })
  //   }, 3000)
  //   return () => clearTimeout(timer)
  // }, [updateButton])

  const handleAdd = (e) => {
    e.preventDefault()
    console.log("handleAdd")
    // Todo validation
    if (todo.length > 0) {
      axios
        .post(`${server}/todos`, { text: todo, type: "" })
        .then(function (response) {
          console.log(response.data)
          // Set state
          const tempTodos = [...todos, response.data]
          setTodos(tempTodos)
          // Reset todo form field/state
          setTodo("")
        })
        .catch(function (error) {
          console.log(error.message)
        })
    } else {
      // TODO: Add error message for form validation
      console.log("Todo bad!")
    }
  }

  // Update todo text field
  const handleUpdateText = (tInput, value) => {
    const updatedTodo = { _id: tInput._id, text: value, type: tInput.type }
    setTodos(todos.map((t, index) => t._id === tInput._id ? updatedTodo : t ))
  }

  // Update todo select field
  const handleUpdateSelect = (tSelect, value) => {
    const updatedTodo = { _id: tSelect._id, text: tSelect.text, type: value }
    setTodos(todos.map((t, index) => t._id === tSelect._id ? updatedTodo : t ))
  }

  // Update todo in database
  const handleUpdateTodo = (t) => {
    axios
      .put(`${server}/todos/${t._id}`, t)
      .then(function (response) {
        console.log(response.data)
        // Udpate "update button" text with happy little checkbox
        setUpdateButton({ updated: true, id: t._id })
        // Remove checkbox after 3 seconds
        setTimeout(() => {
          setUpdateButton({ updated: false, id: "" })
        }, 3000)
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }

  // Delete todo
  const handleDelete = (id) => {
    console.log("handleDelete", id)
    axios
      .delete(`${server}/todos/${id}`)
      .then(function (response) {
        console.log(response.data)
        // Update todos in ui/form
        setTodos(todos.filter(t => t._id !== id))
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }

  return (
    <div className="App">
      <h2>Todo App</h2>
      <form onSubmit={handleAdd}>
        <div className="mb-3">
          <label htmlFor="todo" className="form-label">
            Todo
          </label>
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="form-control"
            id="todo"
            aria-describedby="todo"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <ul className="todo-list-container list-group">
        {todos.map((t, i) => (
          <div key={i} className="input-group">
            <input
              type="text"
              value={t.text}
              onChange={e => handleUpdateText(t, e.target.value)}
              className="form-control"
              placeholder="Todo"
              aria-label="Todo"
            />
            <select
              value={t.type}
              onChange={e => handleUpdateSelect(t, e.target.value)}
              defaultValue={t.type}
            >
              <option value=""></option>
              <option value="Urgent">Urgent</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Uncategorized">Uncategorized</option>
            </select>
            <button
              onClick={(e) => handleUpdateTodo(t)}
              className={`btn ${updateButton.updated && updateButton.id === t._id ? "btn-success" : "btn-primary"}`}
              type="button"
              style={{ minWidth: "78.6px" }}
            >
              {
                (updateButton.updated && updateButton.id === t._id)
                  ? <i className="bi bi-check-square-fill"></i>
                  : "Update"
              }
            </button>
            <button
              onClick={() => handleDelete(t._id)}
              className="btn btn-danger"
              type="button"
            >
              <i
                className="bi bi-trash-fill"
                onClick={() => handleDelete(i)}
              ></i>
            </button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App
