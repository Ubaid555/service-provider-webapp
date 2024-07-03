import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './ChatBox.module.css';

const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [image, setImage] = useState("");
  const chatBoxRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setImage(storedUser.profilePic);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.chatContainer} ref={chatBoxRef}>
      <div className={styles.chatArrowContainer} onClick={toggleChat}>
        <img src={image} alt="User" className={styles.userImage} />
        <span className={styles.messagingText}>Messaging</span>
        <i className={`fa fa-angle-up ${styles.chatArrow}`}></i>
      </div>

      <div className={`${styles.chatBox} ${isChatOpen ? styles.open : ''}`}>
        <div className={styles.chatHeader} onClick={toggleChat}>
          <img src={image} alt="User" className={styles.userImage} />
          <span className={styles.messagingText}>Messaging</span>
          <i className={`fa fa-angle-down ${styles.chatArrow}`}></i>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default ChatBox;
