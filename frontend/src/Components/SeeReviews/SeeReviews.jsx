import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import styles from "./SeeReviews.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SeeReviews = () => {
  const location = useLocation();
  const { category, serviceProviderId, serviceProviderName } = location.state
    ? location.state
    : {};

  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!category || !serviceProviderId || !serviceProviderName) {
      navigate("/services");
    }
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/reviews/getreview/?serviceProviderId=${serviceProviderId}&category=${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(
          data.filter(
            (review) =>
              review.serviceProviderId === serviceProviderId &&
              review.category === category
          )
        );
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [category, serviceProviderId]);

  return (
    <>
      <Navbar />
      <h2 className={styles.seereviewHeading}>
        Reviews for {serviceProviderName}'s {category} services
      </h2>
      <div className={styles.reviewsContainer}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className={styles.review}>
              <div className={styles.reviewHeader}>
                <img
                  src={review.serviceTakerImage}
                  className={styles.serviceTakerImage}
                  alt="Service Taker"
                />
                <div className={styles.headerText}>
                  <p className={styles.name_css}>{review.serviceTakerName}</p>
                  <p className={styles.category_css}>
                    <strong>Service seeked:</strong> {review.category}
                  </p>
                </div>
              </div>
              <div className={styles.commentSection}>
                <p>{review.comment}</p>
              </div>
              <div className={styles.ratingSection}>
                <p>
                  <StarRatingComponent
                    className={styles.star_rating}
                    name={`rating-${review._id}`}
                    starCount={5}
                    value={review.rating}
                    editing={false}
                  />
                </p>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p className={styles.no_Found}>
            No reviews yet for this service provider and category
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SeeReviews;
