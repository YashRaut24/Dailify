import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import HomePage from "./components/HomePage"
import Header from "./components/Header"
import CardsPage from "./components/CardsPage"
import axios from "axios"
import Profile from "./components/Profile"

function App() {
  const [count, setCount] = useState(0);
  let [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [collapsed, setCollapsed] = useState(false);
  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedTask, setSelectedTask] = useState("task1");
  const [profileVisible, setProfileVisible] = useState(false);
  
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
        setTaskCategories={setTaskCategories}
        addTaskCategory={addTaskCategory}
        deleteTaskCategory={deleteTaskCategory}
      />

      <Profile 
        isVisible={profileVisible} 
        onClose={() => setProfileVisible(false)} 
        mode={darkMode ? 'dark' : 'light'} 
      />


      <HomePage 
        mode={darkMode} 
        collapsed={collapsed}
        selectedTask={selectedTask}
        profileVisible={profileVisible}
      />
      <Navbar 
        mode={darkMode} 
        changeTheme={changeTheme}
        profileVisible={profileVisible}
        setProfileVisible={setProfileVisible}
      />
    </>
  )
}

export default App