import React from 'react';
import styles from './WithdrawDetailsModal.module.css'; // Create and style this CSS module

const WithdrawDetailsModal = ({ request, onClose }) => {
    if (!request) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Request Details</h2>
                <p><strong>Name:</strong> {request.name}</p>
                <p><strong>Account Holder Name:</strong> {request.accountHolderName}</p>
                <p><strong>Account Number:</strong> {request.accountNumber}</p>
                <p><strong>Amount:</strong> {request.amount}</p>
                <p><strong>Payment Method:</strong> {request.paymentMethod}</p>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

export default WithdrawDetailsModal;
