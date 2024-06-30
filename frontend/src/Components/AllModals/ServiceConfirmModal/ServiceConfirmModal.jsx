import React, { useEffect } from 'react';
import styles from './ServiceConfirmModal.module.css';

const ServiceConfirmModal = ({ show, onConfirm, onCancel, message, confirmText, cancelText }) => {
    useEffect(() => {
        if (show) {
            // Add 'modal-open' class to body when modal is open
            document.body.classList.add('modal-open');
        } else {
            // Remove 'modal-open' class from body when modal is closed
            document.body.classList.remove('modal-open');
        }

        // Cleanup function to remove 'modal-open' class when component unmounts
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [show]);

    const handleOutsideClick = (event) => {
        if (event.target.className === styles.modalBackdrop) {
            onCancel();
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
            <div className={styles.modal}>
                <h2>Confirmation</h2>
                <p>{message}</p>
                <button onClick={onConfirm} className={styles.confirmBtn}>{confirmText}</button>
                <button onClick={onCancel} className={styles.cancelBtn}>{cancelText}</button>
            </div>
        </div>
    );
};

export default ServiceConfirmModal;