import { useState, useEffect } from 'react'
import './App.css'
import DashboardNavbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import HomePage from "./components/HomePage"
import Header from "./components/Header"
import Profile from "./components/Profile"
import LandingNavbar from "./landings/Navbar"
import LandingPage from "./landings/LandingPage"
import About from "./landings/About"
import Contact from "./landings/Contact"
import SignIn from "./landings/SignIn"
import SignUp from "./landings/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
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

  const DashboardLayout = () => (
    <>
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
      <Header mode={darkMode}/>
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
      <DashboardNavbar 
        mode={darkMode} 
        changeTheme={changeTheme}
        profileVisible={profileVisible}
        setProfileVisible={setProfileVisible}
      />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <LandingNavbar />
            <LandingPage />
          </>
        } />
        
        <Route path="/about" element={
          <>
            <LandingNavbar />
            <About />
          </>
        } />
        
        <Route path="/contact" element={
          <>
            <LandingNavbar />
            <Contact />
          </>
        } />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/dailify" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App