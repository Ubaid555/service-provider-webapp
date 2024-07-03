import React from 'react';
import styles from './MessageInput.module.css';

const MessageInput = () => {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <input type='text' placeholder='Send a message' className={styles.input} />
        <button type='submit' className={styles.button}>Send</button>
      </div>
    </form>
  );
}

export default MessageInput;
