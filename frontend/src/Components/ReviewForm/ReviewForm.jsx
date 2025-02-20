import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ReviewForm.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ReviewList from "./ReviewList";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ReviewForm = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [newReview, setNewReview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!booking) {
      navigate("/mybookings");
    }
  }, [booking, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    if (!comment) {
      toast.error("Comment is required");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/reviews/addreview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceTakerId: booking.serviceTakerId,
            serviceTakerName: booking.serviceTakerName,
            serviceProviderName: booking.serviceProviderName,
            serviceTakerImage: booking.serviceTakerImage,
            serviceProviderId: booking.serviceProviderId,
            category: booking.category,
            rating,
            comment,
          }),
        }
      );

      const data = await response.json();

      if (data.message === "Review Already added") {
        toast.error(data.message);
      } else {
        setNewReview(data);
        setRating(0);
        setComment("");
        toast.success("Review submitted successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the review.");
    }
  };

  if (!booking) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className={styles.bookingDetails}>
        <h1 className={styles.review_heading}>
          Review {booking.serviceProviderName}'s {booking.category} service
        </h1>
      </div>

      <div className={styles.reviewBox}>
        <div className={styles.imageContainer}>
          <img
            src="/Images/review.png"
            alt="Img Description"
            className={styles.formImage}
          />
        </div>

        <form className={styles.reviewForm} onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label className={styles.highlight_label}>Service Name</label>
            <input type="text" value={booking.category} readOnly />
          </div>
          <div className={styles.formControl}>
            <label className={styles.highlight_label}>Name</label>
            <input type="text" value={booking.serviceTakerName} readOnly />
          </div>
          <div className={styles.formControl}>
            <label className={styles.light_label}>Select Rating (1 - 5)</label>
            <StarRatingComponent
              className={styles.stars_sec}
              name="rating"
              starCount={5}
              value={rating}
              onStarClick={(nextValue) => setRating(nextValue)}
            />
          </div>
          <div className={styles.formControl}>
            <label className={styles.highlight_label}>Write a review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here (100-150 characters)"
              className={styles.textarea}
              maxLength={150}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>
      <hr className={styles.line} />

      <ReviewList newReview={newReview} categoryFilter={booking.category} />

      <Footer />
      <ToastContainer />
    </>
  );
};

export default ReviewForm;
