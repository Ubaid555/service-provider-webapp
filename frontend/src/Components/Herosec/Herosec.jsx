import React, { useState, useEffect } from "react";

import "./Herosec.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";
import ChatBox from "../ChatBox/ChatBox";

const Herosec = () =>{
    useEffect(() => {
        document.title = "Trusty Taskers - Home";
        console.log("Home call")
      }, []);

      const [isLoggedIn, setIsLoggedIn] = useState(false);
      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
         setIsLoggedIn(true);
        }
      }, []);

    return( 
    <>
    <Navbar/>
    <main className="hero containers">
        <div className="hero-content">
            <h1>SERVICE BEYOND EXPECTATIONS</h1>
            <p>Discover a partnership that goes beyond services – we're committed to empowering your growth journey. 
                Transforming challenges into opportunities, we're your trusted ally on the path to excellence.</p>

            <div className="hero-btns">
                <NavLink className="primary-btn" to="/services"><button>Services</button></NavLink>
                <NavLink to="/overview"><button className="secondary-btn">Manage Services</button></NavLink>
            </div>
        </div>

        <div className="hero-image">
            <img src="/Images/service provider.png" alt="service provider"/>
        </div>
    </main>
    {isLoggedIn && <ChatBox />}
    <Footer/>
    </>
    );
}
export default Herosec;