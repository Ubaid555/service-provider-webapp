import React, { useState, useEffect } from 'react';
import styles from './Message.module.css';

const Message = ({ message, senderId }) => {
  const [serviceTakerId, setServiceTakerId] = useState("");
  const [image, setImage] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const isCurrentUser = senderId === serviceTakerId;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setServiceTakerId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = senderId;
      try {
        const response = await fetch(`http://localhost:5001/api/auth/getUser?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data[0].profilePic);
          setImage(data[0].profilePic);
        } else {
          console.error('Failed to fetch previous messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    fetchUserData();
  }, [senderId]);

  useEffect(() => {
    // Get the current time and format it as HH:MM AM/PM
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    setTimestamp(formattedTime);
  }, []);

  return (
    <div className={`${styles.container} ${isCurrentUser ? styles.right : styles.left}`}>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src={image} alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>{message}</p>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;