import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ todo, setTodo ] = useState("") // Todo form field
  const [ todos, setTodos ] = useState([]) // Todos state

  useEffect(() => {
    return console.log(todos)
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("handleSubmit")
    // Todo validation
    if (todo.length > 0) {
      // Get previous todos
      let newTodos = [ ...todos ]
      // Add new todo to existing todos
      newTodos.push(todo)
      // Add new todos to state
      setTodos(newTodos)
      // Reset todo form field/state
      setTodo("")
    }
  }

  const handleAddTodo = (e) => {
    setTodo(e.target.value)
  }

  const handleEditTodo = (e, todoIndex) => {
    console.log("handleEditTodo", e.target.value, todoIndex)
    const newTodos = todos.map((todo, index) => todoIndex === index ? e.target.value : todo)
    console.log(newTodos)
    setTodos(newTodos)
  }

  const handleDelete = (todoIndex) => {
    // Remove todo using filter, by index
    const newTodos = todos.filter((todo, index) => index !== todoIndex)
    setTodos(newTodos)
  }

  return (
    <div className="App container-xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="todo" className="form-label">Todo</label>
          <input
            value={todo}
            onChange={handleAddTodo}
            type="text"
            className="form-control"
            id="todo"
            aria-describedby="todo" />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      <ul className="todo-list-container list-group">
        {todos.map((todo, index) => (
          // <div key={index}>
          //   <input
          //     value={todo}
          //     onChange={(e) => handleEditTodo(e, index)}
          //     type="text"
          //     className="form-control"
          //     aria-describedby="todo" />
          //   <span className="garbage-can"><i className="bi bi-trash-fill garbage-color" onClick={() => handleDelete(index)}></i></span>
          // </div>
          <div key={index} className="row g-3 align-items-center">
            <div className="col-auto">
              <input
                  value={todo}
                  onChange={(e) => handleEditTodo(e, index)}
                  type="text"
                  className="form-control"
                  aria-describedby="todo" />
            </div>
            <div className="col-auto">
              <span className="garbage-can"><i className="bi bi-trash-fill garbage-color" onClick={() => handleDelete(index)}></i></span>
            </div>
          </div>
          // <li key={index} className="list-group-item">
          //   <span>{todo}</span>
          //   <span className="garbage-can"><i className="bi bi-trash-fill garbage-color" onClick={() => handleDelete(index)}></i></span>
          // </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
