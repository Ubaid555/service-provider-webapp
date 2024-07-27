import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/Footer';

import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [serviceTakerImage, setServiceTakerImage] = useState("");
    const messagesEndRef = useRef(null); // Create a ref for the messages container

    const location = useLocation();
    const { serviceProviderId, serviceTakerId, serviceProviderImage } = location.state || {};

    const navigate = useNavigate();

    useEffect(() => {
        if (!serviceProviderId || !serviceProviderImage || !serviceTakerId) {
            navigate('/services');
        }
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
            setServiceTakerImage(storedUser.profilePic);
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const conversation = JSON.parse(localStorage.getItem("loginusers"));
                const response = await fetch(`http://localhost:5001/api/messages/${conversation._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'currentuser': serviceProviderId
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                } else {
                    console.error("Failed to fetch previous messages:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching previous messages:", error);
            }
        };

        if (serviceProviderId && serviceTakerId) {
            fetchMessages();
        }
    }, [serviceProviderId, serviceTakerId]);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            const currentUser = JSON.parse(localStorage.getItem("loginusers"))._id;
            if (message.receiverId === currentUser || message.senderId === currentUser) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [serviceTakerId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const send = async () => {
        const loginUser = JSON.parse(localStorage.getItem("loginusers"))._id
        if (message.trim() === "") {
            toast.error("Message cannot be empty");
            return;
        }

        const newMessage = {
            senderId:loginUser,
            receiverId:serviceProviderId,
            message: message,
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch("http://localhost:5001/api/messages/send", {
                method: "POST",
                body: JSON.stringify({newMessage}),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("");
                // setMessages(prevMessages => [...prevMessages, newMessage]);
                toast.success("Message sent successfully");
            } else {
                console.error("Error sending message:", response.statusText);
                toast.error("Error sending message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            send();
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.chatPage}>
                <ToastContainer />
                <div className={styles.leftSection}>
                    <img src="Images/messaging-pic.png" alt="message img" />
                    <h2>Trusty Tasker's <span className={styles.blackSpan}>Messaging System</span></h2>
                    <p>Communicate with your service provider efficiently using our messaging system.</p>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.chatContainer}>
                        <div className={styles.header}>
                            <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41" />
                            <a href="/services"><img src="/Images/closeIcon.png" alt="Close" /></a>
                        </div>
                        <ReactScrollToBottom className={styles.chatBox}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`${styles.message} ${msg.senderId === serviceTakerId ? styles.right : styles.left}`}>
                                    <img
                                        src={msg.senderId === serviceTakerId ? serviceTakerImage : serviceProviderImage}
                                        alt="Avatar"
                                        className={styles.avatar}
                                    />
                                    <p>{msg.message}</p>
                                </div>
                            ))}
                            <div ref={messagesEndRef} /> {/* Add a ref to the end of the messages list */}
                        </ReactScrollToBottom>
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                className={styles.chatInput}
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={send} className={styles.sendBtn}>
                                Send<img src="/Images/send.png" alt="Send" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className={styles.main_foot} />
        </>
    );
};

export default Chat;
