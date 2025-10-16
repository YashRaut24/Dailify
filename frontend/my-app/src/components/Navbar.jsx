import { useState } from "react";
import './Navbar.css';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

function Navbar(props){

    return <div>
        <div className={props.mode? "darkNavbar":"navbar"}>
            <button className="theme-toggle" onClick={props.changeTheme}>{props.mode?<MdOutlineLightMode/> :  <MdDarkMode/>}</button>
        </div>

    </div>
}

export default Navbar;