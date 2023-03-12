import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoText === "") {
      alert("Todo text can't be empty!");
      return;
    }

    const hasTodo = todos.find((todo) => todo.text === todoText);

    if (hasTodo) {
      alert("Aynı ad ile göreviniz var");
      return;
    }

    const newTodo = {
      id: String(new Date().getTime()),
      text: todoText,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  return (
    <div className="container">
      <div className="text-center my-5">
        <h4 className="fw-bold">My Todos</h4>
      </div>
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Type your Todos"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
      {todos.length === 0 ? (
        <div className="text-center my-5">
          <h5>Nothing to do yet</h5>
        </div>
      ) : (
        todos.map((item) => (
          <div>
            <div className="alert alert-secondary" role="alert">
              {item.text}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
