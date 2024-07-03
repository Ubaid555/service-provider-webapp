import React from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import styles from './MessageContainer.module.css';

const MessageContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>To:</span>
        <span className={styles.recipient}>Hanzala Javaid</span>
      </div>
      <div className={styles.messages}>
        <Messages />
      </div>
      <div className={styles.stickyInput}>
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;
