import React, { useEffect } from 'react';
import styles from './ContactSuccessModal.module.css';

const ContactSuccessModal = ({ show, onClose }) => {
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
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        <img src="/Images/done.jpg" height="150px" width="200px" alt="done-icon" className={styles.doneIcon} />
        <h2>Success!</h2>
        <p>Message sent successfully</p>
        <button onClick={onClose} className={styles.okBtn}>OK</button>
      </div>
    </div>
  );
};

export default ContactSuccessModal;