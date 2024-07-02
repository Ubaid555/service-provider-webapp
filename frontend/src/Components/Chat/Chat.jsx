import React from 'react';
import styles from "./Chat.module.css";
//import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const Chat = () => {
    // const messages = [
    //     { id: 1, user: 'User A', message: 'Hello!' },
    //     { id: 2, user: 'User B', message: 'Hi there!' },
    //     { id: 1, user: 'User A', message: 'How are you?' },
    // ];

    const send = () => {
        // Simulate send functionality (optional for UI display)
    };

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatContainer}>
                <div className={styles.header}>
                    
                    <img src="/Images/app-logo.jpeg" alt="app-logo" width="85" height="41"/>
                    <a href="/services"> <img src="/Images/closeIcon.png" alt="Close"/></a>
                </div>
                <ReactScrollToBottom className={styles.chatBox}>
                    {/* {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.user}
                            message={item.message}
                            classs={item.id === 1 ? styles.right : styles.left} // Adjust class based on user id for UI display
                        />
                    ))} */}
                </ReactScrollToBottom>
                <div className={styles.inputBox}>
                    <input type="text" className={styles.chatInput} placeholder="Type your message..." />
                    <button onClick={send} className={styles.sendBtn}>Send<img src="/Images/send.png" alt="Send" /></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
