import React from 'react';
import styles from './Conversation.module.css';

const Conversation = ({ conversation, lastIdx, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <img
            src={conversation.profilePic}
            alt="User Profile"
            className={styles.userImage}
          />
        </div>
        <div className={styles.nameContainer}>
          <p className={styles.userName}>{conversation.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;