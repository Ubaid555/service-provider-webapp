// import React from 'react';
// import MessageInput from './MessageInput';
// import Messages from './Messages';
// import styles from './MessageContainer.module.css';

// const MessageContainer = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span className={styles.label}>To:</span>
//         <span className={styles.recipient}>Hanzala Javaid</span>
//       </div>
//       <div className={styles.messages}>
//         <Messages />
//       </div>
//       <div className={styles.stickyInput}>
//         <MessageInput />
//       </div>
//     </div>
//   );
// };

// export default MessageContainer;

import React from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import styles from './MessageContainer.module.css';

const MessageContainer = ({ conversation, onBackClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <i className={`fa fa-arrow-left ${styles.backIcon}`} onClick={onBackClick}></i>
        <span className={styles.label}>To:</span>
        <span className={styles.recipient}>{conversation.fullName}</span>
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

