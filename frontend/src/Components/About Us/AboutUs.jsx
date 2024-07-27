import React, { useState, useEffect } from "react";
import { AboutText } from "../AboutText/AboutText";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AboutHeader } from "../AboutHeader/AboutHeader";
import AboutAddress from "../About Address/AboutAddress";
import ChatBox from "../ChatBox/ChatBox";
import TranslateButton from "../TranslateButton/TranslateButton";

export const AboutUs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="about-us">
      <Navbar />
      <TranslateButton />
      <AboutHeader />
      <AboutText />
      <AboutAddress />
      {isLoggedIn && <ChatBox />}
      <Footer />
    </div>
  );
};
