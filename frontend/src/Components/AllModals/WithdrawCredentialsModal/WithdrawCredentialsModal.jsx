import React, { useEffect } from 'react';
import styles from './WithdrawCredentialsModal.module.css';

const WithdrawCredentialsModal = ({ request, onClose }) => {
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

    if (!request) return null; // Return null if request is not provided or null

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            <div className={styles.modalContent}>
                <h2 className={styles.details}>Account Details</h2>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <p><strong>Account Holder Name:</strong> {request.accountHolderName}</p>
                <p><strong>Account Number:</strong> {request.accountNumber}</p>
                <p><strong>Amount:</strong> {request.amountToWithdraw}</p>
                <p><strong>Payment Method:</strong> {request.withdrawMethod}</p>
                <p><strong>Date:</strong> {new Date(request.updatedAt).toLocaleDateString()} </p>
            </div>
        </div>
    );
};

export default WithdrawCredentialsModal;
