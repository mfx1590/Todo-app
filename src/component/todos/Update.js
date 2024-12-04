import { useContext, useState } from "react";
import TodoContext from "../../context/TodoContext";


const UpdateTodo= ({todos}) => {

  const [loading , setLoading] = useState (false) ;
    const {updateTodo} = useContext(TodoContext);

    const handleUpdate = async() => {
      setLoading(true);
      await updateTodo(todos);
      setLoading(false);  
    }
    return(
        <>
             {todos.completed ? 
                    <i onClick={() => handleUpdate()} className="bi bi-check-all fs-4"></i>
                  :
                    <i onClick={() => handleUpdate()} className="bi bi-check fs-4"></i>
                  }
                  {loading && <div className="spinner-border spinner-border-sm ms-2" ></div>}

        </>
    );

}

export default UpdateTodo;