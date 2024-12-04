import { useCallback, useReducer } from "react";
import TodoContext from "./TodoContext";
import todoReducer from "./todoReduser";
import axios from "axios";
import Swal from "sweetalert2";


const TodoProvider = ({ children }) => {
  const initialState = {
    todos: [],
    error: null
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos?_sort=id&_order=desc"); // Backend sorting
      dispatch({ type: "SET_TODO", payload: res.data });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      dispatch({ type: "SET_TODO", payload: [] });
    }
  }, []);
  
  const filterTodo = async (limit) => {
    try {
      const res = await axios.get(`http://localhost:5000/todos?_limit=${limit}`);
      dispatch({ type: "FILTER_TODO", payload: res.data });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      dispatch({ type: "FILTER_TODO", payload: [] });
    }
  };

  const addTodo = async (title) => {
    try {
      const res = await axios.post("http://localhost:5000/todos", {
        title: title,
        completed: false,
      });
      dispatch({ type: "ADD_TODO", payload: res.data }); // Add new todo to top
      Swal.fire({
        title: "Task added",
        text: "Success",
        icon: "success",
        showCancelButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };
  

  const updateTodo = async (todos) => {
    try {
      const res = await axios.put(`http://localhost:5000/todos/${todos.id}`, {
        title: todos.title,
        completed: !todos.completed, 
      });
  
      dispatch({ type: "UPDATE_TODO", payload: res.data });
      dispatch({ type: "SET_ERROR", payload: null });
  
      Swal.fire({
        title: "Task Updated",
        text: "The task status has been successfully updated.",
        icon: "success",
        showCancelButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
  
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred while updating the task.",
        icon: "error",
        showCancelButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    }
  };

  const removeTodo = async (todosId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todosId}`);
      dispatch({ type: "REMOVE_TODO", payload: todosId }); 
      fetchData(); 
      Swal.fire({
        title: "Deleted!",
        text: "The task has been successfully deleted.",
        icon: "success",
        showCancelButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred while deleting the task.",
        icon: "error",
        showCancelButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top",
      });
    }
  };
  
  
  
  

  return (
    <TodoContext.Provider value={{ ...state , fetchData , filterTodo , addTodo , updateTodo , removeTodo}}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
 