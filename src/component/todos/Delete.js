import { useContext, useState } from "react";
import TodoContext from "../../context/TodoContext";

const DeleteTodo = ({ todosId }) => { 

  const [loading, setLoading] = useState(false);
  const { removeTodo } = useContext(TodoContext);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await removeTodo(todosId); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <i
        onClick={handleDelete}
        className="bi bi-trash fs-6"
        style={{ cursor: "pointer", color: "red" }}
      ></i>
      {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
    </>
  );
};

export default DeleteTodo;
