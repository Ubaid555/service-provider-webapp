import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Services.css";
import ChatBox from "../ChatBox/ChatBox";
import AdminNavbar from "../Admin Dashboard/Admin Navbar/AdminNavbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Services = () => {
  const [Sdata, setSdata] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = "Trusty Taskers - View Services";
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("loginusers");
    if (auth) {
      const role = JSON.parse(localStorage.getItem("loginusers")).role;
      if (role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/services/service`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        console.log("In Service.jsx", result);
        setSdata(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="services-container">
      {isAdmin && <AdminNavbar />}
      {!isAdmin && <Navbar />}
      <h1 className="head_style">List of top Services</h1>
      <div className="cards-container">
        {Sdata.length > 0 ? (
          Sdata.map((val) => (
            <Cards
              key={val.id}
              imgsrc={val.imgsrc}
              title={val.title}
              sname={val.sname}
              link={val.link}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <div className="no_services_present">
            <p className="noo_services">No Services Found</p>
          </div>
        )}
      </div>
      {!isAdmin && <ChatBox />}
      <Footer />
    </div>
  );
};

export default Services;
