import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./AllUsers.module.css";

const AllUsers = () => {
  const [services, setServices] = useState([]);
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch userId from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  // Fetch services when userId changes
  useEffect(() => {
    if (userId !== null) {
      getServices();
    }
  }, [userId, location.search]); // Adding dependencies

  const getServices = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const category = queryParams.get("category");
      const url = new URL("http://localhost:5001/api/services/viewservice");
      if (category) {
        url.searchParams.append("category", category);
      }
      if (userId) {
        url.searchParams.append("userId", userId);
      }
      console.log(`Fetching services from: ${url}`);
      let result = await fetch(url);
      console.log(`Fetch response: ${result.status}`);
      if (result.ok) {
        result = await result.json();
        if (Array.isArray(result)) {
          setServices(result);
        } else {
          setServices([]);
        }
      } else {
        console.error("Error fetching products:", result.status);
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleBookNow = (service) => {
    navigate("/bookingform", {
      state: {
        category: service.category,
        serviceProviderName: service.fullName,
        serviceProviderId: service.userId,
        serviceProviderPhone: service.phone,
        serviceProviderImage: service.profilePic,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles["service-list-container"]}>
        <h3 className={styles.heading_style}>List of Service Providers</h3>
        <div className={styles.cards}>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className={styles.card}>
                <img
                  src={service.profilePic}
                  alt="service-img"
                  className={styles.card_img}
                />
                <div className={styles.card_info}>
                  <span className={styles.card_category}>
                    {service.category}
                  </span>
                  <h3 className={styles.card_title}>{service.fullName}</h3>
                  <p>
                    <strong>Phone:</strong> {service.phone}
                  </p>
                  <p>
                    <strong>Price:</strong> {service.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {service.description}
                  </p>
                  <button
                    className={styles.card_btn}
                    onClick={() => handleBookNow(service)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.no_services}>No services available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllUsers;
