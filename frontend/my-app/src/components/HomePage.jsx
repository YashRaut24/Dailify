import { useState, useRef } from "react";
import CardsPage from "./CardsPage";
import "./HomePage.css"

function HomePage(props) {

  const list = [];

  const addList = (event) => {
    list++
  }

  return (
    <div>
      {list.map((list,index)=>{
        <div key={index} className="taskListArea">
            <div><input placeholder="Enter your task"  className={`${props.mode ? "darklist" : "list"} ${props.collapsed ? "expanded" : ""}`}/></div>
            <button onClick={()=>{addList}} className="add-note">+</button>
        </div>
      })}
    

      {/* <CardsPage mode={props.mode} collapsed={props.collapsed} /> */}
    </div>
  );
}

export default HomePage;
