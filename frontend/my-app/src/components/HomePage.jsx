import { useState, useRef, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";

function HomePage(props) {
  const [tasks, setTasks] = useState([{ id: Date.now(), text: "" }]);
  const [focusIndex, setFocusIndex] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (focusIndex !== null && inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  }, [focusIndex, tasks.length]);

  const addTask = (index) => {
    const newId = Date.now();
    const newTasks = [...tasks];
    
    if(tasks[index].text.trim() === "" ){
      alert("Please enter a note");
    } else {
      newTasks.splice(index + 1, 0, { id: newId, text: "" });
      setTasks(newTasks);
      setFocusIndex(index + 1);
    }
  };

  const removeTask = (index) => {
    const taskToDelete = tasks[index];

    if (!taskToDelete || taskToDelete.text.trim() === "") {
      alert("Cannot delete an empty task!");
      return;
    }

    axios.delete("http://localhost:9000/delete", { 
      data: { task: taskToDelete.text } 
    })
    .then(() => {
      const existingTasks = [...tasks];
      existingTasks.splice(index, 1);
      setTasks(existingTasks);
      alert("Task deleted successfully!");
    })
    .catch(() => {
      alert("Error deleting task!");
    });
  };

  const updateTask = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], text: value };
    setTasks(newTasks);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      if (tasks[index].text.trim() === "") {
        alert("Please enter a note");
      } else {
        axios.post("http://localhost:9000/add", { 
          task: tasks[index].text 
        })
        .then(() => {
          addTask(index);
        })
        .catch(() => {
          alert("Error adding task");
        });
      }
    }
  };

  return (
    <div className={`task-container ${props.collapsed ? "expanded" : ""}`}>
      {tasks.map((task, index) => (
        <div key={task.id} className="taskListArea">
          <div className="listContainer">
            <input
              ref={el => inputRefs.current[index] = el}
              type="text"
              placeholder="Enter your task"
              className={props.mode ? "darklist" : "list"}
              value={task.text}
              onChange={(e) => updateTask(index, e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, index)}
            />
            <button 
              className="remove-note" 
              onClick={() => {
                if (tasks.length > 1) removeTask(index);
                else alert("At least one note required!");
              }}
              aria-label="Remove task"
            >
              ×
            </button>
          </div>
          <button 
            className={props.mode ? "dark-addNote" : "add-note"}
            onClick={() => addTask(index)}
            aria-label="Add task"
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;