import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./BookingForm.module.css";
import ChatBox from "../ChatBox/ChatBox";
import Loader from "../Loader/Loader";

import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [serviceTakerId, setServiceTakerId] = useState("");
  const [serviceTakerName, setServiceTakerName] = useState("");
  const [serviceTakerPhone, setServiceTakerPhone] = useState("");
  const [serviceTakerImage, setServiceTakerImage] = useState("");

  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState({ hour: "", period: "AM" });

  const location = useLocation();
  const {
    category,
    serviceProviderId,
    serviceProviderName,
    serviceProviderPhone,
    serviceProviderImage,
    price,
  } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !category ||
      !serviceProviderId ||
      !serviceProviderName ||
      !serviceProviderPhone ||
      !serviceProviderImage ||
      !price
    ) {
      navigate("/services");
    }
  });

  useEffect(() => {
    document.title = "Trusty Taskers - Booking Form";
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loginusers"));
    if (userData) {
      setServiceTakerId(userData._id);
      setServiceTakerName(userData.fullName);
      setServiceTakerPhone(userData.phone);
      setServiceTakerImage(userData.profilePic);
    }
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; 
    const formattedDate = selectedDate.split("T")[0];
    setDate(formattedDate); 
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const handleBookService = async (e) => {
    e.preventDefault();

    if (!address && !description && !date && !time.hour && !time.period) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!address || !description || !date || !time.hour || !time.period) {
      if (!date) {
        toast.error("Please fill in date");
        return;
      }

      if (!time.hour || !time.period) {
        toast.error("Please fill in time");
        return;
      }
      if (!address) {
        toast.error("Please fill in address");
        return;
      }

      if (!description) {
        toast.error("Please fill in description");
        return;
      }
    }

    const formattedTime = `${time.hour} ${time.period}`;
    setLoading(true);
    try {
      let response = await fetch(
        "http://localhost:5001/api/bookings/bookService",
        {
          method: "POST",
          body: JSON.stringify({
            serviceTakerId,
            serviceTakerName,
            serviceTakerPhone,
            serviceTakerImage,
            serviceProviderId,
            serviceProviderName,
            serviceProviderPhone,
            serviceProviderImage,
            category,
            address,
            description,
            date,
            time: formattedTime,
            price,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      let data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else if (data.session.url) {
        window.location.href = data.session.url; // Redirect to Stripe checkout page
      }
    } catch (error) {
      console.error("Error occurred during fetch:", error);
      toast.error("An error occurred while requesting the service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className={styles.main_heading}>Book your service here</h1>
      <section className={styles.book_container}>
        <div className={styles.contact_form}>
          <form className="form">
            <div className={styles.form_control}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={serviceProviderName}
                readOnly
              />
            </div>

            <div className={styles.form_control}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                readOnly
              />
            </div>

            <div className={styles.form_control}>
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={serviceProviderPhone}
                readOnly
              />
            </div>

            <div className={styles.form_control}>
              <label htmlFor="price">Price</label>
              <input type="text" name="price" value={`Pkr ${price}`} readOnly />
            </div>

            <div className={styles.form_control}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className={styles.form_control}>
              <label htmlFor="time">Time</label>
              <div className={styles.time_select}>
                <select
                  className={styles.select}
                  name="hour"
                  value={time.hour}
                  onChange={handleTimeChange}
                  required
                >
                  <option value="">Hour</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.select}
                  name="period"
                  value={time.period}
                  onChange={handleTimeChange}
                  required
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div className={styles.form_control}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className={styles.form_control}>
              <label htmlFor="text">Enter your problem here</label>
              <textarea
                name="text"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <NavLink
                type="submit"
                className={styles.bookbtn}
                onClick={handleBookService}
              >
                <button>Book Now</button>
              </NavLink>
            )}
          </form>
        </div>
        <div className={styles.booking_image}>
          <img src="Images/Book.png" alt="Booking" />
        </div>
      </section>
      <Footer />
      <ChatBox />
      <ToastContainer />
    </>
  );
};

export default BookingForm;
