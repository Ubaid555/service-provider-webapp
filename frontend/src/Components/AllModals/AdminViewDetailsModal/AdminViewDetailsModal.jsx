import React, { useEffect } from 'react';
import styles from './AdminViewDetailsModal.module.css';

const AdminViewDetailsModal = ({ booking, onClose }) => {
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
                <p><strong>Provider Name:</strong> {booking.serviceProviderName}</p>
                <p><strong>Seeker Name:</strong> {booking.serviceTakerName}</p>
                <p><strong>Service Date:</strong> {booking.date}</p>
                <p><strong>Service Time:</strong> {booking.time}</p>
                <p><strong>Provider Status:</strong> {booking.serviceProviderStatus}</p>
                <p><strong>Seeker Status:</strong> {booking.userStatus}</p>
                <p><strong>Updated At:</strong> {new Date(booking.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default AdminViewDetailsModal;
