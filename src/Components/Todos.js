import React from "react";

const Todos = (props) => {
  const {
    item,
    handleDelete,
    setIsEdit,
    setEditTodoId,
    setTodoText,
    changeIsDone,
  } = props;
  return (
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
  );
};
export default Todos;
