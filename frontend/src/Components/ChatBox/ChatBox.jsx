import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './ChatBox.module.css';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:5001');

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`${BASE_URL}/auth/getUser?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          return data[0].fullName; 
        } else {
          console.error('Failed to fetch user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const handleReceiveMessage = async (message) => {
      if (message.senderId) {
        const senderName = await fetchUserData(message.senderId);
        const currentUser = JSON.parse(localStorage.getItem('loginusers'))._id;
        if (message.receiverId === currentUser) {
          toast.success(`New Message From ${senderName}`);

          //Play a sound when a new message is received
          // const audio = new Audio('/Tones/tone.mp3');
          // audio.play();
          
        }
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
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