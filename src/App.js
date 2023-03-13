import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoText === "") {
      alert("Todo text can't be empty!");
      return;
    }

    const hasTodo = todos.find((todo) => todo.text === todoText);

    if (hasTodo) {
      alert("You have the todo already");
      return;
    }

    if (isEdit === true) {
      const editTodo = todos.find((todo) => todo.id === editTodoId);
      const newEditTodo = {
        ...editTodo,
        text: todoText,
      };

      const filteredEdit = todos.filter((todo) => todo.id !== editTodoId);
      setTodos([...filteredEdit, newEditTodo]);
      setTodoText("");
      setIsEdit(false);
    } else {
      const newTodo = {
        id: String(new Date().getTime()),
        text: todoText,
        isDone: false,
      };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const changeIsDone = (id) => {
    const changedTodo = todos.find((todo) => todo.id === id);
    const newChangeTodo = {
      ...changedTodo,
      isDone: !changedTodo.isDone,
    };

    const changedTodoFilter = todos.filter((todo) => todo.id !== id);

    setTodos([...changedTodoFilter, newChangeTodo]);
  };

  const handleDelete = (id) => {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    console.log("deletedTodo", deletedTodo);
    setTodos(deletedTodo);
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
        <button
          className={`btn btn-${isEdit === true ? "success" : "primary"}`}
          type="submit"
        >
          {isEdit === true ? "Save" : "Add"}
        </button>
      </form>
      {todos.length === 0 ? (
        <div className="text-center my-5">
          <h5>Nothing to do yet</h5>
        </div>
      ) : (
        todos.map((item) => (
          <div key={item.id}>
            <div
              className={`alert alert-${
                item.isDone === false ? "secondary" : "success"
              } d-flex justify-content-between align-items-center py-2`}
              role="alert"
            >
              {item.text}
              <div>
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setEditTodoId(item.id);
                    setTodoText(item.text);
                  }}
                  className="btn btn-sm btn-success py-0"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-sm btn-danger py-0 mx-1"
                >
                  Delete
                </button>
                <button
                  className={`btn btn-sm btn-${
                    item.isDone === false ? "secondary" : "success"
                  } py-0`}
                  onClick={() => changeIsDone(item.id)}
                >
                  {item.isDone === false ? "Done" : "UnDone"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
