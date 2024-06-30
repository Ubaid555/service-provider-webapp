// ConfirmModal.js
import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this profile?</p>
                <button onClick={onConfirm} className={styles.confirmBtn}>Delete</button>
                <button onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmModal;