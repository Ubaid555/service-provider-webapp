import React, { useEffect } from 'react';
import styles from './CancelPendingModal.module.css';

const CancelPendingModal = ({ show, onConfirm, onCancel }) => {
    useEffect(() => {
        if (show) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

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
                <p>Are you sure you want to cancel this booking?</p>
                <div className={styles.buttonContainer}>
                    <button onClick={onConfirm} className={styles.confirmBtn}>YES</button>
                    <button onClick={onCancel} className={styles.cancelBtn}>NO</button>
                </div>
            </div>
        </div>
    );
};

export default CancelPendingModal;