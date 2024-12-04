import { useContext, useState } from "react";
import TodoContext from "../../context/TodoContext";

const FilterTodo = () => {
  const { filterTodo } = useContext(TodoContext); 
  const [loading , setLoading] = useState (false) ;
  const handleFilter = async (e) => {
    setLoading(true)
    try {
      const value = e.target.value; 
      await filterTodo(value); 
    } catch (error) {
      console.error("Error filtering todos:", error);
    }
    setLoading(false)
  };

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-2">
          <h6>Filter</h6>
          <select
            onChange={(e) => handleFilter(e)}
            className="form-select form-select-sm">
            <option value="100">all</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          {loading && <div className="spinner-border spinner-border-sm"></div>}
        </div>
      </div>
    </div>
  );
};

export default FilterTodo;
