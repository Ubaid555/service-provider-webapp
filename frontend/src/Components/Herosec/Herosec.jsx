import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import "./Herosec.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";
import ChatBox from "../ChatBox/ChatBox";
import TranslateButton from "../TranslateButton/TranslateButton";

const Herosec = () => {
  const { t, i18n } = useTranslation();
  const heroContentRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    document.title = "Trusty Taskers - Home";
    console.log("Home call");

    setTimeout(() => {
      heroContentRef.current.classList.add("animate");
      heroBtnsRef.current.classList.add("animate");
      heroImageRef.current.classList.add("animate");
    }, 100);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <TranslateButton />
      <main
        className={`hero containers ${i18n.language === "ur" ? "rtl" : ""}`}
      >
        <div ref={heroContentRef} className="hero-content">
          <h1>{t("serviceBeyondExpectations")}</h1>
          <p>{t("description")}</p>

          <div ref={heroBtnsRef} className="hero-btns">
            <NavLink className="primary-btn" to="/services">
              <button>{t("services")}</button>
            </NavLink>
            <NavLink to="/overview">
              <button className="secondary-btn">{t("manageServices")}</button>
            </NavLink>
          </div>
        </div>

        <div ref={heroImageRef} className="hero-image">
          <img src="/Images/service provider.png" alt="service provider" />
        </div>
      </main>
      {isLoggedIn && <ChatBox />}
      <Footer />
    </>
  );
};

export default Herosec;
