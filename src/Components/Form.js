import React from "react";

const Form = (props) => {
  console.log("props", props);
  const { handleSubmit, todoText, setTodoText, isEdit } = props;
  return (
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
  );
};

export default Form;
