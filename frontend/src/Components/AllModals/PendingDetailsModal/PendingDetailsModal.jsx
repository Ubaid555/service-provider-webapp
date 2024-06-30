import React, { useEffect } from 'react';
import styles from './PendingDetailsModal.module.css';

const BookingDetailsModal = ({ booking, onClose }) => {
    useEffect(() => {
        // Add 'modal-open' class to body when modal is open
        document.body.classList.add('modal-open');
        
        // Cleanup function to remove 'modal-open' class when modal is closed
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (event.target.className === styles.modal) {
            onClose();
        }
    };

    if (!booking) return null; // Return null if booking is not provided or null

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <img
                    className={styles.providerImg}
                    src={booking.serviceProviderImage}
                    alt="profile-img"
                />
                <p><strong>Service Name:</strong> {booking.category}</p>
                <p><strong>Seeker Name:</strong> {booking.serviceTakerName}</p>
                <p><strong>Seeker Phone:</strong> {booking.serviceTakerPhone}</p>
                <p><strong>Service Date:</strong> {booking.date}</p>
                <p><strong>Service Time:</strong> {booking.time}</p>
                <p><strong>Status:</strong> {booking.currentStatus}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Description:</strong> {booking.description}</p>
            </div>
        </div>
    );
};

export default BookingDetailsModal;