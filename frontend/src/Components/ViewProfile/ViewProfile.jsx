// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';
// import styles from "./ViewProfile.module.css";
// import Footer from '../Footer/Footer';

// const ViewProfile = () => {
//     const [userProfile, setUserProfile] = useState(null); 
//     const navigate = useNavigate();

//     useEffect(() => {
//         document.title = "Trusty Taskers - Profile";
//         showProfileDetail();
//     }, []);

//     const showProfileDetail = async () => {
//         const userId = JSON.parse(localStorage.getItem("loginusers"))._id;
//         let result = await fetch(`http://localhost:4500/showProfile?userId=${userId}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         result = await result.json();
//         setUserProfile(result[0]); 
//     };

//     const handleUpdateProfile = (profile) => {
//         navigate('/updateprofile', { state: { profile } });
//     };

//     return (
//         <>
//             <Navbar />
//             <h1 className={styles.main_heading}>{JSON.parse(localStorage.getItem("loginusers")).name}'s PROFILE</h1>
//             <div className={styles.section_white}>
//                 {userProfile ? (
//                     <div className={styles.card}>
//                         <img
//                             className={styles.teamImg}
//                             src={userProfile.image}
//                             alt="profile-img"
//                         />
//                         <div className={styles.cardInfo}>
//                             <form>
//                                 <div className={styles.formGroup}>
//                                     <label className={styles.cardCategory}>Profession</label>
//                                     <input
//                                         type="text"
//                                         value={userProfile.category}
//                                         className={styles.cardInput}
//                                         readOnly
//                                     />
//                                 </div>
//                                 <div className={styles.formGroup}>
//                                     <label className={styles.cardTitle}>Name</label>
//                                     <input
//                                         type="text"
//                                         value={userProfile.name}
//                                         className={styles.cardInput}
//                                         readOnly
//                                     />
//                                 </div>
//                                 <div className={styles.formGroup}>
//                                     <label>Phone</label>
//                                     <input
//                                         type="text"
//                                         value={userProfile.phone}
//                                         className={styles.cardInput}
//                                         readOnly
//                                     />
//                                 </div>
//                                 <button 
//                                     type="button" 
//                                     className={styles.cardBtn} 
//                                     onClick={() => handleUpdateProfile(userProfile)}
//                                 >
//                                     Update Profile
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className={styles.oops}>
//                         <p className={styles.no_services}>Add services first</p>
//                     </div>
//                 )}
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default ViewProfile;


import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import styles from "./ViewProfile.module.css";
import Footer from '../Footer/Footer';
import SecondCounter from '../Second Counter/SecondCounter';
import ChatBox from '../ChatBox/ChatBox';

const ViewProfile = () => {
    const [userProfile, setUserProfile] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Trusty Taskers - Profile";
        showProfileDetail();
    }, []);

    const showProfileDetail = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("loginusers"))._id;
            let result = await fetch(`http://localhost:5001/api/profile/showProfile?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            result = await result.json();
            if (result.success) {
                setUserProfile(result.success);
            } else {
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setUserProfile(null); // Handle error by setting userProfile to null
        }
    };

    const handleUpdateProfile = (profile) => {
        navigate('/updateprofile', { state: { profile } });
    };

    return (
        <>
            <Navbar />
            <h1 className={styles.main_heading}>{userProfile ? `${userProfile.fullName}'s PROFILE` : 'Profile'}</h1>
            <div className={styles.section_white}>
                {userProfile ? (
                    <div className={styles.card}>
                        <img
                            className={styles.teamImg}
                            src={userProfile.profilePic}
                            alt="profile-img"
                        />
                        <div className={styles.cardInfo}>
                            <form>
                                <div className={styles.formGroup}>
                                    <label className={styles.cardTitle}>Name</label>
                                    <input
                                        type="text"
                                        value={userProfile.fullName}
                                        className={styles.cardInput}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.cardTitle}>Email</label>
                                    <input
                                        type="text"
                                        value={userProfile.email}
                                        className={styles.cardInput}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        value={userProfile.phone}
                                        className={styles.cardInput}
                                        readOnly
                                    />
                                </div>
                                <button 
                                    type="button" 
                                    className={styles.cardBtn} 
                                    onClick={() => handleUpdateProfile(userProfile)}
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className={styles.oops}>
                        <p className={styles.no_services}>Profile not found or error loading profile.</p>
                    </div>
                )}

                <SecondCounter />
            </div>
            <ChatBox/>
            <Footer />
        </>
    );
};

export default ViewProfile;