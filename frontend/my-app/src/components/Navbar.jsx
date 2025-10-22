import { useState } from "react";
import './Navbar.css';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function Navbar(props){

    const toggleProfile = (e) => {
        e.preventDefault();
        props.setProfileVisible(!props.profileVisible);
    } 

    return <div className={props.mode? "darkNavbar":"navbar"}>
            <button className="theme-toggle" onClick={props.changeTheme}>
                {props.mode ? <MdOutlineLightMode/> : <MdDarkMode/>}
            </button>
            <button onClick={toggleProfile} className={props.mode? "dark-profile" : "profile"}>
                <CgProfile />
            </button>
        </div>
}

export default Navbar;