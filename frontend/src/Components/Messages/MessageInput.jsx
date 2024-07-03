// import React from 'react';
// import styles from './MessageInput.module.css';

// const MessageInput = () => {
//   return (
//     <form className={styles.form}>
//       <div className={styles.inputContainer}>
//         <input type='text' placeholder='Send a message' className={styles.input} />
//         <button type='submit' className={styles.button}>Send</button>
//       </div>
//     </form>
//   );
// }

// export default MessageInput;


import React, { useState } from 'react';
import styles from './MessageInput.module.css';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Send a message"
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
