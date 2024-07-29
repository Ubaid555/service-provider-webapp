import React, { useEffect } from 'react';
import styles from './AdminDisputeModal.module.css';

const AdminDisputeModal = ({ booking, onClose }) => {
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

    if (!booking) return null;

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <div className={styles.imageContainer}>
                    <div>
                        <label><strong>Before</strong></label>
                        <img
                            className={styles.providerImg}
                            src={booking.problemPic}
                            alt="problem-img"
                        />
                    </div>
                    <div>
                        <label><strong>After</strong></label>
                        <img
                            className={styles.providerImg}
                            src={booking.completionPic}
                            alt="completion-img"
                        />
                    </div>
                </div>
                <p><strong>Service Name:</strong> {booking.category}</p>
                <p><strong>Provider Name:</strong> {booking.serviceProviderName}</p>
                <p><strong>Seeker Name:</strong> {booking.serviceTakerName}</p>
                <p><strong>Service Date:</strong> {booking.date}</p>
                <p><strong>Service Time:</strong> {booking.time}</p>
                <p><strong>Provider Status:</strong> {booking.serviceProviderStatus}</p>
                <p><strong>Seeker Status:</strong> {booking.userStatus}</p>
                <p><strong>Price:</strong> {booking.price}</p>
                <p><strong>Description:</strong> {booking.description}</p>
                <p><strong>Updated At:</strong> {new Date(booking.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default AdminDisputeModal;
