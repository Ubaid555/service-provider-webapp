// import React from 'react';
// import styles from './Message.module.css';

// const Message = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.messageHeader}>
//         <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
//       </div>
//       <div className={styles.messageBody}>
//         <p className={styles.messageText}>Hi! What's Upp?</p>
//         <span className={styles.timestamp}>12:52</span>
//       </div>
//       <div className={styles.messageBody}>
//         <p className={styles.messageText}>Hi! What's Upp?</p>
//         <span className={styles.timestamp}>12:52</span>
//       </div>
//       <div className={styles.messageBody}>
//         <p className={styles.messageText}>Hi! What's Upp?</p>
//         <span className={styles.timestamp}>12:52</span>
//       </div>
//       <div className={styles.messageBody}>
//         <p className={styles.messageText}>Hi! What's Upp?</p>
//         <span className={styles.timestamp}>12:52</span>
//       </div>
//       <div className={styles.messageBody}>
//         <p className={styles.messageText}>Hi! What's Upp?</p>
//         <span className={styles.timestamp}>12:52</span>
//       </div>
//     </div>
//   );
// }

// export default Message;

import React from 'react';
import styles from './Message.module.css';

const Message = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>Hi! What's Upp Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequuntur adipisci mollitia vitae quis. Repellendus, facilis quis minus mollitia ipsam laudantium eveniet unde facere ullam reiciendis placeat velit rem nihil.?</p>
          <span className={styles.timestamp}>12:52</span>
        </div>
      </div>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>Hi! What's Upp?</p>
          <span className={styles.timestamp}>12:52</span>
        </div>
      </div>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>Hi! What's Upp?</p>
          <span className={styles.timestamp}>12:52</span>
        </div>
      </div>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>Hi! What's Upp?</p>
          <span className={styles.timestamp}>12:52</span>
        </div>
      </div>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>Hi! What's Upp?</p>
          <span className={styles.timestamp}>12:52</span>
        </div>
      </div>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>Hi! What's Upp?</p>
          <span className={styles.timestamp}>12:52</span>
        </div>
      </div>
      {/* Repeat for other messages */}
    </div>
  );
}

export default Message;
