import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import styles from './MessageContainer.module.css';

const MessageContainer = ({ conversation, onBackClick }) => {
  const [messages, setMessages] = useState([]);
  const [serviceTakerId,setServiceTakerId] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setServiceTakerId(storedUser._id);
    }
}, []);

  useEffect(() => {
    // Fetch previous messages
    const storedUsers = JSON.parse(localStorage.getItem("loginusers"))._id;
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/messages/${conversation._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'serviceTakerId': storedUsers, // Replace with actual logic
          },
        });
        if (response.ok) {
          const data = await response.json();
          const extractedMessages = data.map((item) => ({
            content: item.message,
            senderId: item.senderId,
            createdAt: item.createdAt,
          }));
          setMessages(extractedMessages);
        } else {
          console.error('Failed to fetch previous messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    if (conversation) {
      fetchMessages();
    }
  }, [conversation]);

  const sendMessage = async (message) => {
    if (message.trim() === '') {
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/messages/send', {
        method: 'POST',
        body: JSON.stringify({
          serviceProviderId: conversation._id,
          serviceTakerId: serviceTakerId, // Replace with actual logic
          message,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, { senderId: serviceTakerId, content: data.message ,createdAt: data.createdAt}]);
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <i className={`fa fa-arrow-left ${styles.backIcon}`} onClick={onBackClick}></i>
        <span className={styles.label}>To:</span>
        <span className={styles.recipient}>{conversation.fullName}</span>
      </div>
      <div className={styles.messages}>
        <Messages messages={messages} />
      </div>
      <div className={styles.stickyInput}>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default MessageContainer;
