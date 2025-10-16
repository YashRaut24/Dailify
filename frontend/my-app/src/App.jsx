import { useState,useEffect } from 'react'
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
  let [darkMode,setDarkMode] = useState(localStorage.getItem("darkMode")==="true");
  function changeTheme(){
    localStorage.setItem("darkMode",!darkMode);
    setDarkMode(
      (prev) => !prev
    );
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
  return (
    <>
      <Header mode ={darkMode}/>
      <Sidebar mode = {darkMode} collapsed={collapsed} setCollapsed={setCollapsed} />
      <HomePage mode ={darkMode} collapsed={collapsed} />
      <Navbar mode = {darkMode} changeTheme={changeTheme}/>
    </>
  )
}

export default App
