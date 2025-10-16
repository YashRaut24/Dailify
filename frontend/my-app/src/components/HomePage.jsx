import React, { useState } from "react";
import "./HomePage.css";
function HomePage(props){

  const[task,setTask] = useState("");

  return(
    <div className={`task-container ${props.collapsed ? "expanded" : ""}`}>
      <h1>Tasks</h1>
      <input 
        className={props.mode ? "darklist" : "list"}
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <p>Typed task: {task}</p>
    </div>
  )
}

export default HomePage;