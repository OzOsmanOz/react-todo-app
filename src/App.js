import React, { useEffect, useState } from "react";
import Form from "./Components/Form";
import Todos from "./Components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState("");

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    console.log("todoFromLocalStorage", todosFromLocalStorage);
    if (todosFromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

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
      localStorage.setItem(
        "todos",
        JSON.stringify([...filteredEdit, newEditTodo])
      );
      setTodoText("");
      setIsEdit(false);
    } else {
      const newTodo = {
        id: String(new Date().getTime()),
        text: todoText,
        isDone: false,
      };
      setTodos([...todos, newTodo]);
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
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
    localStorage.setItem(
      "todos",
      JSON.stringify([...changedTodoFilter, newChangeTodo])
    );
  };

  const handleDelete = (id) => {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    console.log("deletedTodo", deletedTodo);
    setTodos(deletedTodo);
    localStorage.setItem("todos", JSON.stringify(deletedTodo));
  };

  return (
    <div className="container">
      <div className="text-center my-5">
        <h4 className="fw-bold">My Todos</h4>
      </div>
      <Form
        handleSubmit={handleSubmit}
        todoText={todoText}
        setTodoText={setTodoText}
        isEdit={isEdit}
      />
      {todos.length === 0 ? (
        <div className="text-center my-5">
          <h5>Nothing to do yet</h5>
        </div>
      ) : (
        todos.map((item) => (
          <Todos
            item={item}
            handleDelete={handleDelete}
            setIsEdit={setIsEdit}
            setEditTodoId={setEditTodoId}
            setTodoText={setTodoText}
            changeIsDone={changeIsDone}
          />
        ))
      )}
    </div>
  );
}

export default App;
