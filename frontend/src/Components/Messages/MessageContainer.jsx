import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageInput from './MessageInput';
import Messages from './Messages';
import styles from './MessageContainer.module.css';

const socket = io('http://localhost:5001');

const MessageContainer = ({ conversation, onBackClick }) => {
    const [messages, setMessages] = useState([]);
    const [serviceTakerId, setServiceTakerId] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
            setServiceTakerId(storedUser._id);
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/messages/${conversation._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'serviceTakerId': serviceTakerId,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                } else {
                    console.error('Failed to fetch previous messages:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching previous messages:', error);
            }
        };

        if (conversation && serviceTakerId) {
            fetchMessages();
        }
    }, [conversation, serviceTakerId]);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            if (message.receiverId === serviceTakerId || message.senderId === serviceTakerId) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [serviceTakerId]);

    const sendMessage = async (messageContent) => {
        if (messageContent.trim() === '') {
            return;
        }

        const newMessage = {
            senderId: serviceTakerId,
            receiverId: conversation._id,
            message: messageContent,
            createdAt: new Date().toISOString()
        };

        //setMessages((prevMessages) => [...prevMessages, newMessage]);
        // console.log("Set Messages at this stage is ",messages);

        try {
            const response = await fetch('http://localhost:5001/api/messages/send', {
                method: 'POST',
                body: JSON.stringify({
                    serviceProviderId: conversation._id,
                    serviceTakerId: serviceTakerId,
                    message: messageContent,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data after sending message",data);
                //socket.emit('sendMessage', data);
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
