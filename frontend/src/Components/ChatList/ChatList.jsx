// ChatList.js
import React, { useState, useEffect } from 'react';
import styles from './ChatList.module.css';

const ChatList = ({ onSelectConversation }) => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/messages/conversations');
                const data = await response.json();
                setConversations(data);
            } catch (error) {
                console.error('Failed to fetch conversations:', error);
            }
        };

        fetchConversations();
    }, []);

    return (
        <div className={styles.chatList}>
            {conversations.map(convo => (
                <div key={convo._id} className={styles.conversation} onClick={() => onSelectConversation(convo._id)}>
                    <img src={convo.participants[0].profilePic} alt="User" className={styles.userImage} />
                    <div className={styles.conversationInfo}>
                        <span className={styles.userName}>{convo.participants[0].name}</span>
                        <span className={styles.lastMessage}>{convo.messages[convo.messages.length - 1]?.message}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
