import { useState } from "react";
import './Sidebar.css';
import HomePage from "./HomePage";

function Sidebar({ mode, collapsed, setCollapsed }) {

  const[togglePage,setTogglePage] = useState();
  
  const setPage = () =>{
    alert("You are in a task");
  }

  return (
    <div className={`${mode ? "darkSidebar" : "sidebar"} ${collapsed ? "collapsed" : ""}`}>
      <button
        className={mode ? "darkToggleButton" : "toggleButton"}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "→" : "←"}
      </button>
      {!collapsed && <p onClick={setPage} className={mode ? "darkTask" : "task"}>
        Tasks 1
        </p>}
      {collapsed && <p className={mode? "darkST" : "ST"}>T1</p>}

       {!collapsed && <p onClick={setPage} className={mode ? "darkTask" : "task"}>
        Tasks 2
        </p>}
      {collapsed && <p className={mode? "darkST" : "ST"}>T2</p>}
    </div>
  );
}

export default Sidebar;
