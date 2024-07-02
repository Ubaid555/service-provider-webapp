import React, { useState } from 'react';
import styles from './ChatBox.module.css';

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatArrowContainer} onClick={toggleChat}>
        <img src="./Images/plumber.png" alt="User" className={styles.userImage} />
        <span className={styles.messagingText}>Messaging</span>
        <i className={`fa fa-angle-up ${styles.chatArrow}`}></i>
      </div>
      <div className={`${styles.chatBox} ${isChatOpen ? styles.open : ''}`}>
        <div className={styles.chatHeader} onClick={toggleChat}>
          
          <img src="./Images/plumber.png" alt="User" className={styles.userImage} />
          <span className={styles.messagingText}>Messaging</span>
          <i className={`fa fa-angle-down ${styles.chatArrow}`}></i>
          
        </div>
        <div className={styles.chatMessage}>User1: Hello!</div>
        <div className={styles.chatMessage}>User2: Hi, how are you?</div>
        <div className={styles.chatMessage}>User1: I'm good, thanks! What about you?</div>
        <div className={styles.chatMessage}>User2: Doing great, thank you!</div>
      </div>
    </div>
  );
};

export default ChatBox;
