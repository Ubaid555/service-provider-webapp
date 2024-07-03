// // import React from 'react';
// // import styles from './Message.module.css';

// // const Message = () => {
// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.messageHeader}>
// //         <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
// //       </div>
// //       <div className={styles.messageBody}>
// //         <p className={styles.messageText}>Hi! What's Upp?</p>
// //         <span className={styles.timestamp}>12:52</span>
// //       </div>
// //       <div className={styles.messageBody}>
// //         <p className={styles.messageText}>Hi! What's Upp?</p>
// //         <span className={styles.timestamp}>12:52</span>
// //       </div>
// //       <div className={styles.messageBody}>
// //         <p className={styles.messageText}>Hi! What's Upp?</p>
// //         <span className={styles.timestamp}>12:52</span>
// //       </div>
// //       <div className={styles.messageBody}>
// //         <p className={styles.messageText}>Hi! What's Upp?</p>
// //         <span className={styles.timestamp}>12:52</span>
// //       </div>
// //       <div className={styles.messageBody}>
// //         <p className={styles.messageText}>Hi! What's Upp?</p>
// //         <span className={styles.timestamp}>12:52</span>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Message;

// import React from 'react';
// import styles from './Message.module.css';

// const Message = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.message}>
//         <div className={styles.messageHeader}>
//           <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
//         </div>
//         <div className={styles.messageBody}>
//           <p className={styles.messageText}>Hi! What's Upp Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequuntur adipisci mollitia vitae quis. Repellendus, facilis quis minus mollitia ipsam laudantium eveniet unde facere ullam reiciendis placeat velit rem nihil.?</p>
//           <span className={styles.timestamp}>12:52</span>
//         </div>
//       </div>
//       <div className={styles.message}>
//         <div className={styles.messageHeader}>
//           <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
//         </div>
//         <div className={styles.messageBody}>
//           <p className={styles.messageText}>Hi! What's Upp?</p>
//           <span className={styles.timestamp}>12:52</span>
//         </div>
//       </div>
//       <div className={styles.message}>
//         <div className={styles.messageHeader}>
//           <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
//         </div>
//         <div className={styles.messageBody}>
//           <p className={styles.messageText}>Hi! What's Upp?</p>
//           <span className={styles.timestamp}>12:52</span>
//         </div>
//       </div>
//       <div className={styles.message}>
//         <div className={styles.messageHeader}>
//           <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
//         </div>
//         <div className={styles.messageBody}>
//           <p className={styles.messageText}>Hi! What's Upp?</p>
//           <span className={styles.timestamp}>12:52</span>
//         </div>
//       </div>
//       <div className={styles.message}>
//         <div className={styles.messageHeader}>
//           <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
//         </div>
//         <div className={styles.messageBody}>
//           <p className={styles.messageText}>Hi! What's Upp?</p>
//           <span className={styles.timestamp}>12:52</span>
//         </div>
//       </div>
//       <div className={styles.message}>
//         <div className={styles.messageHeader}>
//           <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.avatar} />
//         </div>
//         <div className={styles.messageBody}>
//           <p className={styles.messageText}>Hi! What's Upp?</p>
//           <span className={styles.timestamp}>12:52</span>
//         </div>
//       </div>
//       {/* Repeat for other messages */}
//     </div>
//   );
// }

// export default Message;


// import React, { useState, useEffect } from 'react';
// import styles from './Message.module.css';

// const Message = ({ message, senderId }) => {
//   const [serviceTakerId,setServiceTakerId] = useState("");
//   const isCurrentUser = senderId === serviceTakerId; // Replace with actual logic
//   const [image,setImage]=useState("");


//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("loginusers"));
//     if (storedUser && storedUser._id) {
//       setServiceTakerId(storedUser._id);
//     }
// }, []);

// useEffect(() => {
//   const fetchUserData = async () => {
//     const userId = senderId;
//     try {
//       const response = await fetch(`http://localhost:5001/api/auth/getUser?userId=${userId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data[0].profilePic);
//         setImage(data[0].profilePic);
//       } else {
//         console.error('Failed to fetch previous messages:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching previous messages:', error);
//     }
//   };

//   fetchUserData();
// }, [senderId]);

//   return (
//     <div className={isCurrentUser ? styles.right : styles.left}>
//       <div className={styles.message}>
//         <div className={styles.messageHeader}>
//           <img src={image} alt="user-avatar" className={styles.avatar} />
//         </div>
//         <div className={styles.messageBody}>
//           <p className={styles.messageText}>{message}</p>
//           <span className={styles.timestamp}>12:52</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;



import React, { useState, useEffect } from 'react';
import styles from './Message.module.css';

const Message = ({ message, senderId }) => {
  const [serviceTakerId, setServiceTakerId] = useState("");
  const [image, setImage] = useState("");
  const isCurrentUser = senderId === serviceTakerId;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setServiceTakerId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = senderId;
      try {
        const response = await fetch(`http://localhost:5001/api/auth/getUser?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data[0].profilePic);
          setImage(data[0].profilePic);
        } else {
          console.error('Failed to fetch previous messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    fetchUserData();
  }, [senderId]);

  return (
    <div className={`${styles.container} ${isCurrentUser ? styles.right : styles.left}`}>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <img src={image} alt="user-avatar" className={styles.avatar} />
        </div>
        <div className={styles.messageBody}>
          <p className={styles.messageText}>{message}</p>
          <span className={styles.timestamp}>12:52</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
