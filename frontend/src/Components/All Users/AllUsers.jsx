import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./AllUsers.module.css";

const AllUsers = () => {
  const [services, setServices] = useState([]);
  const [userId, setUserId] = useState(null);
  const [averageRatings, setAverageRatings] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trusty Taskers - Providers List";
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  const getServices = useCallback(async () => {
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
          setFilteredServices(result);
          calculateAverageRatings(result, category);
        } else {
          setServices([]);
          setFilteredServices([]);
        }
      } else {
        console.error("Error fetching products:", result.status);
        setServices([]);
        setFilteredServices([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setServices([]);
      setFilteredServices([]);
    }
  }, [location.search, userId]);

  const filterServices = useCallback(() => {
    if (searchQuery.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) =>
          service.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.price.toString().includes(searchQuery)
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  useEffect(() => {
    if (userId !== null) {
      getServices();
    }
  }, [userId, location.search, getServices]);

  useEffect(() => {
    filterServices();
  }, [searchQuery, services, filterServices]);

  const calculateAverageRatings = async (services, category) => {
    const ratings = {};
    for (const service of services) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/reviews/getaverage?serviceProviderId=${service.userId}&category=${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch average ratings");
        }
        const data = await response.json();
        ratings[service.userId] = Math.floor(data.averageRating);
      } catch (error) {
        console.error(
          `Error fetching average rating for ${service.userId}:`,
          error
        );
        ratings[service.userId] = null;
      }
    }
    setAverageRatings(ratings);
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

  const handleSeeReviews = (service) => {
    navigate("/seereviews", {
      state: {
        category: service.category,
        serviceProviderId: service.userId,
        serviceProviderName: service.fullName,
      },
    });
  };

  const handleMessageIconClick = () => {
    navigate("/chat");
  };

  return (
    <>
      <Navbar />
      <div className={styles["service-list-container"]}>
        <h3 className={styles.heading_style}>List of Service Providers</h3>
        <div className={styles.search_container}>
          <input
            type="text"
            placeholder="Search by name or price"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.search_input}
          />
        </div>
        <div className={styles.cards}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service._id} className={styles.card}>
                <img
                  src={service.profilePic}
                  alt="service-img"
                  className={styles.card_img}
                />
                <div className={styles.card_info}>
                  <span className={styles.card_category}>
                    {service.category}
                    <i
                      className="fa-regular fa-message"
                      aria-hidden="true"
                      onClick={handleMessageIconClick}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                  <h3 className={styles.card_title}>{service.fullName}</h3>
                  <div className={styles.averageRating}>
                    {averageRatings[service.userId] !== null ? (
                      <StarRatingComponent
                        className={styles.stars}
                        name={`average-rating-${service.userId}`}
                        starCount={5}
                        value={averageRatings[service.userId] || 0}
                        editing={false}
                      />
                    ) : (
                      <div className={styles.no_ratings}>
                        <span>Not Rated Yet</span>
                      </div>
                    )}
                  </div>
                  <p>
                    <strong>Phone:</strong> {service.phone}
                  </p>
                  <p>
                    <strong>Price:</strong> {service.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {service.description}
                  </p>
                  <div className={styles.both_buttons}>
                    <button
                      className={styles.card_btn}
                      onClick={() => handleBookNow(service)}
                    >
                      Book Now
                    </button>
                    {averageRatings[service.userId] !== null && (
                      <button
                        className={styles.seereviews_btn}
                        onClick={() => handleSeeReviews(service)}
                      >
                        See Reviews
                      </button>
                    )}
                  </div>
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

