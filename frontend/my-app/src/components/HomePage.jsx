import { useState, useRef, useEffect } from "react";
import "./HomePage.css";

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
    }else{
      newTasks.splice(index + 1, 0, { id: newId, text: "" });
      setTasks(newTasks);
      setFocusIndex(index + 1);
    }
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
      addTask(index);
    }
  }
};


  return (
    <div className={`task-container ${props.collapsed ? "expanded" : ""}`}>
      {tasks.map((task, index) => (
        <div key={task.id} className="taskListArea">
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
            className="add-note" 
            onClick={() => addTask(index)}
            aria-label="Add task"
          >
            +
          </button>
        </div>
      ))}
      {/* <div className="Card">
          <h3>Hover ME</h3>
          <div className="box">YAsh Raut</div>  
      </div> */}
    </div>
  );
}

export default HomePage;