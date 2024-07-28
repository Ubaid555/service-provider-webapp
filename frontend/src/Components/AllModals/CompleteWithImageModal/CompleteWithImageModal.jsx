import React, { useState } from "react";
import styles from "./CompleteWithImageModal.module.css";

const CompleteWithImageModal = ({ show, onConfirm, onCancel, booking }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (image) {
      onConfirm(booking._id, image);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.className === styles.modal) {
      onCancel();
    }
  };

  return (
    show && (
      <div className={styles.modal} onClick={handleClickOutside}>
        <div className={styles.modalContent}>
          <h2>Complete Booking</h2>
          <p>
            Boost trust and eliminate disputes by uploading <br /> a completion
            image after every service!
          </p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className={styles.actions}>
            <button className={styles.confirmButton} onClick={handleSubmit}>
              Complete
            </button>
            <button className={styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CompleteWithImageModal;
