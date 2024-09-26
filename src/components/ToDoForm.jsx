import "./ToDo.css";
import { useState } from "react";


    
export const ToDoForm = () => {

        const [inputValue, setInputValue] = useState("");
      
        const handleInputChange = (value) => {
          setInputValue(value);
        };

  return (
    <section className="form">
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            className="todo-input"
            autoComplete="off"
            value={inputValue}
            onChange={(event) => handleInputChange(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
};
