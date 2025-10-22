import { useState, useRef, useEffect } from "react";
import "./HomePage.css";
import TaskContainer from "./TaskContainer";

function HomePage(props) {
  if (props.profileVisible) return null; // Hide tasks when profile is visible
  
  return (
    <div className={`task-container ${props.collapsed ? "expanded" : ""}`}>
      <TaskContainer mode={props.mode} category={props.selectedTask} collapsed={props.collapsed} />
    </div>
  );
}

export default HomePage;