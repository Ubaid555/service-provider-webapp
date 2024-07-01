import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styles from './ReviewList.module.css';

const ReviewList = ({ newReview, categoryFilter }) => {
    const [reviews, setReviews] = useState([]);
    const POLL_INTERVAL = 5000;

    useEffect(() => {
        fetchReviews();

        const interval = setInterval(fetchReviews, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (newReview) {
            setReviews(prevReviews => [newReview, ...prevReviews]);
        }
    }, [newReview]);

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/reviews/getreview');
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data.reverse());
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const filteredReviews = reviews.filter(review => review.category === categoryFilter);

    return (
        <>
            <h2 className={styles.reviewHeading}>Reviews for {categoryFilter}</h2>
            <div className={styles.reviewsContainer}>
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <div key={review._id} className={styles.review}>
                            <div className={styles.reviewHeader}>
                                <img src={review.serviceTakerImage} className={styles.serviceTakerImage} alt="Service Taker" />
                                <div className={styles.headerText}>
                                    <p className={styles.name_css}>{review.serviceTakerName}</p>
                                    <p className={styles.category_css}><strong>Service seeked:</strong> {review.category}</p>
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
                    <p className={styles.noReviewsMessage}>No reviews yet for this category</p>
                )}
            </div>
        </>
    );
};

export default ReviewList;