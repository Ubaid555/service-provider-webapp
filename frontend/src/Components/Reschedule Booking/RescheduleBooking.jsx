import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./RescheduleBooking.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RescheduleBooking = () => {
  const location = useLocation();
  const { booking } = location.state || {};
  const [updatedBooking, setUpdatedBooking] = useState(booking || {});
  const [time, setTime] = useState({ hour: "", period: "AM" });

  const navigate = useNavigate();

  useEffect(() => {
    if (!booking) {
      navigate("/mybookings");
    }
  }, [booking, navigate]);

  useEffect(() => {
    document.title = "Trusty Taskers - Update Booking";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooking({
      ...updatedBooking,
      [name]: value,
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(
        `${BASE_URL}/bookings/updateBooking`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: updatedBooking._id,
            ...updatedBooking,
            time: `${time.hour} ${time.period}`,
          }),
        }
      );

      let result = await response.json();

      if (response.status === 200) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Unsuccessful Updation");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    }
  };

  return (
    <>
      <Navbar />
      <h1 className={styles.main_heading}>Reschedule a service</h1>
      <div className={styles.updateProfileContainer}>
        <form className={styles.cardInfo} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.cardCategory}>
              Profession
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={updatedBooking.category}
              className={styles.cardInput}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              value={updatedBooking.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              className={styles.cardInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="time">Time</label>
              <select
                className={styles.cardInputHalf}
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
                className={styles.cardInputHalf}
                name="period"
                value={time.period}
                onChange={handleTimeChange}
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={updatedBooking.description}
              onChange={handleChange}
              className={styles.cardInput}
            />
          </div>
          <button type="submit" className={styles.cardBtn}>
            Reschedule Booking
          </button>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default RescheduleBooking;

