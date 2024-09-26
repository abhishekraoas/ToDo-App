import { useEffect, useState } from "react";
import "./ToDo.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import {
    getLocalStorageTodoData,
    setLocalStorageTodoData,
  } from "./ToDoLocalStorage";


export const ToDo = () => {
  const [inputValue, setInputValue] = useState(() => getLocalStorageTodoData());

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return;

    if (task.includes(inputValue)) {
      alert("Task already exists");
      return;
    }

    setTask((prevTask) => [...prevTask, inputValue]);

    setInputValue("");
  };

  // To Do Date and Time

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();

      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //todo add data to localStorage
  setLocalStorageTodoData(task);

  //Delete the Task
  const handleDeleteToDo = (value) => {
    const newTask = task.filter((task) => task !== value);
    setTask(newTask);
  };

  //Clear All Task
  const handleCLearToDO = () => {
    setTask([]);
  };

  //Check the Task
  const [checked, setChecked] = useState(false);
  const handleCheckList = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTask(updatedTask);
  };

  return (
    <section className="todo-container">
      <header>
        <h1>My To Do List</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>
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
      <section className="myUnOrdList">
        <ul>
          {task.map((currTask, index) => (
            <li key={index} className="todo-item">
              <span className={checked ? "checkList" : "notCheckList"}>
                {currTask}
              </span>
              <button
                className="check-btn"
                onClick={() => handleCheckList(currTask)}
              >
                <FaCheckCircle />
              </button>
              <button
                onClick={() => handleDeleteToDo(currTask)}
                className="delete-btn"
              >
                <MdDeleteSweep />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <button className="clear-btn" onClick={handleCLearToDO}>
          Clear All
        </button>
      </section>
    </section>
  );
};
