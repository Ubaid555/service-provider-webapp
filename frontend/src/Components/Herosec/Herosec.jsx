import React from "react";
import { useEffect } from 'react';
import "./Herosec.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";

const Herosec = () =>{
    useEffect(() => {
        document.title = "Trusty Taskers - Home";
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
                <NavLink to="/services"><button>Get Started</button></NavLink>
                <NavLink to="/services"><button className="secondary-btn">Services</button></NavLink>
            </div>
        </div>

        <div className="hero-image">
            <img src="/Images/service provider.png" alt="service provider"/>
        </div>
    </main>
    <Footer/>
    </>
    );
}
export default Herosec;