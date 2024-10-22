import React from "react";

//Navigation Bar Component
export default function Navbar(){
    return(
        <div className="navbar"> 
            <h1 className="navbar-logo">WeatherCheck</h1>
            <ul className="navbar-menu">
                <li>Home</li>
                <li>About</li>
            </ul>
        </div>
    )
}