import { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";
import FilterTodo from "../component/todos/Filter";
import CreateTodo from "../component/todos/Create";
import UpdateTodo from "../component/todos/Update";
import DeleteTodo from "../component/todos/Delete";

const Todo = () => {
  const {todos , fetchData , error} = useContext(TodoContext);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    
     
    const fetchTodos = async () => {
      await fetchData();
      setLoading(false);
    };
  
    fetchTodos();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row g-3">
        <CreateTodo />
        <hr />
        <FilterTodo />
        {error && <div>{error}</div>}
        {loading && <div className="col-md-12 text-center"><div className="spinner-border mt-5"></div></div>}
        {todos && todos.map((todos) => (
          <div key={todos.id} className="col-md-4">
            <div className={"card" + (todos.completed ? " bg-light" : "")}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>{todos.completed ? <del>{todos.title}</del> : <span>{todos.title}</span>}</div>
                <div className="d-flex justify-content-between align-items-center">
                  <UpdateTodo todos={todos} />
                  <DeleteTodo  todosId={todos.id}/>
                </div>
              </div>
            </div>
          </div>
        ))}

    </div> 
  </div>
  );
  
};

export default Todo;
