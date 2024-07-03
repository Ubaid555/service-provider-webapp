// import React from "react";

// const Conversation = () => {
//   return (
//     <>
//       <div>
//         <div>
//           <div>
//             <img src="https://avatar.iran.liara.run/public" alt="user-avatar" />
//           </div>
//         </div>
//         <div>
//           <div>
//             <p>Muhammad Ubaid</p>
//           </div>
//         </div>
//       </div>
//       <div></div>
//     </>
//   );
// };

// export default Conversation;

import React from "react";
import styles from "./Conversation.module.css";

const Conversation = ({conversation,lastIdx}) => {

  return (
    <div className={styles.container}>
      {/* <div className={styles.row}>
        <div className={styles.imageContainer}>
          <img src="https://avatar.iran.liara.run/public" alt="user-avatar" className={styles.userImage} />
        </div>
        <div className={styles.nameContainer}>
          <p className={styles.userName}>Muhammad Ubaid</p>
        </div>
      </div> */}
      <hr className={styles.divider} />
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <img src={conversation.profilePic} alt="https://avatar.iran.liara.run/public" className={styles.userImage} />
        </div>
        <div className={styles.nameContainer}>
          <p className={styles.userName}>{conversation.fullName}</p>
        </div>
      </div>

      {!lastIdx && <div />}
      {/* <hr className={styles.divider} /> */}
    </div>
  );
};

export default Conversation;
