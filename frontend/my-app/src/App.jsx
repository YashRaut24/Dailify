import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import HomePage from "./components/HomePage"
import Header from "./components/Header"
import CardsPage from "./components/CardsPage"

function App() {
  const [count, setCount] = useState(0);
  let [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  
  function changeTheme() {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode((prev) => !prev);
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const [collapsed, setCollapsed] = useState(false);
  
  const [taskCategories, setTaskCategories] = useState([
    { id: "task1", name: "Tasks 1" }
  ]);
  const [selectedTask, setSelectedTask] = useState("task1");

  const addTaskCategory = () => {
    const newId = `task${taskCategories.length + 1}`;
    const newCategory = {
      id: newId,
      name: `Tasks ${taskCategories.length + 1}`
    };
    setTaskCategories([...taskCategories, newCategory]);
    setSelectedTask(newId); 
  };

  const deleteTaskCategory = (categoryId) => {
    if (taskCategories.length === 1) {
      alert("You must have at least one task category!");
      return;
    }
    
    const filtered = taskCategories.filter(cat => cat.id !== categoryId);
    setTaskCategories(filtered);
    
    if (selectedTask === categoryId) {
      setSelectedTask(filtered[0].id);
    }
  };

  return (
    <>
      <Header mode={darkMode} />
      <Sidebar 
        mode={darkMode} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        taskCategories={taskCategories}
        addTaskCategory={addTaskCategory}
        deleteTaskCategory={deleteTaskCategory}
      />
      <HomePage 
        mode={darkMode} 
        collapsed={collapsed}
        selectedTask={selectedTask}
      />
      <Navbar mode={darkMode} changeTheme={changeTheme} />
    </>
  )
}

export default App