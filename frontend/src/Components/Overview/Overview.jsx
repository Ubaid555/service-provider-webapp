import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import styles from "./Overview.module.css";
import Navbar from "../Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import ChatBox from "../ChatBox/ChatBox";

const Overview = () => {
  const user = JSON.parse(localStorage.getItem("loginusers"));
  const userName = user ? user.fullName : "User";

  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("loginusers"));
      if (!user || !user._id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const userId = user._id;
      setUserProfile(user.profilePic);
      try {
        const response = await fetch(
          `http://localhost:5001/api/overview/overviewAllServices?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();
        setData(result.success[0]);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem("loginusers"));
      if (!user || !user._id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const userId = user._id;
      try {
        const response = await fetch(
          `http://localhost:5001/api/overview/overviewUserServices?userId=${userId}`
        );
        const result = await response.json();
        if(result.success){
        setUserData(result.success[0]);}
      } catch (err) {
        setError("Error fetching data");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // Check if data or userProfile is still loading
  if (!data || userProfile === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Dashboard />
      <div className={styles.header_overview}>
        <h1 className={styles.heading_overview}>
          <span className={styles.welcome}>Welcome</span> to{" "}
          <span className={styles.name_part}>{userName}'s</span> Dashboard
        </h1>
        {userProfile && (
          <img
            className={styles.profile_image}
            src={userProfile}
            alt="profile-img"
          />
        )}
      </div>
      <div className={styles.overviewWrapper}>
        <div className={styles.overview_container}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Total No. of Services Offered</h2>
            <p className={styles.cardValue}>
              <CountUp end={data.totalServices} duration={2.5} />
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Total Services Requested</h2>
            <p className={styles.cardValue}>
              <CountUp end={data.totalServicesRequested} duration={2.5} />
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Total Services Confirmed</h2>
            <p className={styles.cardValue}>
              <CountUp end={data.totalServicesConfirmed} duration={2.5} />
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Total Services Completed</h2>
            <p className={styles.cardValue}>
              <CountUp end={data.totalServicesCompleted} duration={2.5} />
            </p>
          </div>
        </div>
      </div>
      <ChatBox/>
      <Footer />
    </>
  );
};

export default Overview;

// import React, { useState, useEffect } from "react";
// import CountUp from "react-countup";
// import { useTranslation } from 'react-i18next';
// import styles from "./Overview.module.css";
// import Navbar from "../Navbar/Navbar";
// import Dashboard from "../Dashboard/Dashboard";
// import Footer from "../Footer/Footer";
// import ChatBox from "../ChatBox/ChatBox";
// import TranslateButton from "../TranslateButton/TranslateButton";

// const Overview = () => {
//   const { t } = useTranslation('overview'); // Use 'overview' namespace
//   const user = JSON.parse(localStorage.getItem("loginusers"));
//   const userName = user ? user.fullName : t('default_user');

//   const [data, setData] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const user = JSON.parse(localStorage.getItem("loginusers"));
//       if (!user || !user._id) {
//         console.error("User ID not found in localStorage");
//         return;
//       }

//       const userId = user._id;
//       setUserProfile(user.profilePic);
//       try {
//         const response = await fetch(
//           `http://localhost:5001/api/overview/overviewAllServices?userId=${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Error fetching data");
//         }
//         const result = await response.json();
//         setData(result.success[0]);
//       } catch (err) {
//         setError(t('error_message'));
//       }
//     };

//     fetchData();
//   }, [t]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = JSON.parse(localStorage.getItem("loginusers"));
//       if (!user || !user._id) {
//         console.error("User ID not found in localStorage");
//         return;
//       }

//       const userId = user._id;
//       try {
//         const response = await fetch(
//           `http://localhost:5001/api/overview/overviewUserServices?userId=${userId}`
//         );
//         const result = await response.json();
//         if(result.success){
//         setUserData(result.success[0]);}
//       } catch (err) {
//         setError(t('error_message'));
//       }
//     };

//     fetchUserData();
//   }, [t]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Check if data or userProfile is still loading
//   if (!data || userProfile === null) {
//     return <div>{t('loading_message')}</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <TranslateButton/>
//       <Dashboard />
//       <div className={styles.header_overview}>
//         <h1 className={styles.heading_overview}>
//           {t('welcome_message', { name: userName })}
//         </h1>
//         {userProfile && (
//           <img
//             className={styles.profile_image}
//             src={userProfile}
//             alt="profile-img"
//           />
//         )}
//       </div>
//       <div className={styles.overviewWrapper}>
//         <div className={styles.overview_container}>
//           <div className={styles.card}>
//             <h2 className={styles.cardTitle}>{t('total_services_offered')}</h2>
//             <p className={styles.cardValue}>
//               <CountUp end={data.totalServices} duration={2.5} />
//             </p>
//           </div>
//           <div className={styles.card}>
//             <h2 className={styles.cardTitle}>{t('total_services_requested')}</h2>
//             <p className={styles.cardValue}>
//               <CountUp end={data.totalServicesRequested} duration={2.5} />
//             </p>
//           </div>
//           <div className={styles.card}>
//             <h2 className={styles.cardTitle}>{t('total_services_confirmed')}</h2>
//             <p className={styles.cardValue}>
//               <CountUp end={data.totalServicesConfirmed} duration={2.5} />
//             </p>
//           </div>
//           <div className={styles.card}>
//             <h2 className={styles.cardTitle}>{t('total_services_completed')}</h2>
//             <p className={styles.cardValue}>
//               <CountUp end={data.totalServicesCompleted} duration={2.5} />
//             </p>
//           </div>
//         </div>
//       </div>
//       <ChatBox />
//       <Footer />
//     </>
//   );
// };

// export default Overview;

