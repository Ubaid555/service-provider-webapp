import React, { useState, useEffect } from "react";
import styles from "./Conversation.module.css";

const Conversation = ({ conversation, lastIdx, onClick }) => {
  const [message, setMessages] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("loginusers"))._id;
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/messages/${conversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              currentUser: storedUsers, 
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const lastMessage = data.reverse();
          setMessages(lastMessage[0].message);
        } else {
          console.error(
            "Failed to fetch previous messages:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    };

    if (conversation) {
      fetchMessages();
    }
  }, [conversation]);

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
          <p className={styles.last_message}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
