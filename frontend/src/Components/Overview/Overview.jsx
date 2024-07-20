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
//   const { t } = useTranslation('overview');
//   const user = JSON.parse(localStorage.getItem("loginusers"));
//   const userName = user ? user.fullName : t('User');

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
//         setError(t("Error fetching data"));
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
//         setError(t("Error fetching data"));
//       }
//     };

//     fetchUserData();
//   }, [t]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!data || userProfile === null) {
//     return <div>{t("Loading...")}</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <TranslateButton/>
//       <Dashboard />
//       <div className={styles.header_overview}>
//         {/* <h1 className={styles.heading_overview}>
//           <span className={styles.welcome}>{t("welcomeMessage", { userName })}</span>
//         </h1> */}
//         <h1 className={styles.heading_overview}>
//           <span className={styles.welcome}>{t("welcome")} </span> 
//           <span>{t("to")}</span>
//           <span className={styles.name_part}>{userName}'s</span> 
//           <span>{t("dashboard")}</span>
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
//             <h2 className={styles.cardTitle}>{t("totalServicesOffered")}</h2>
//             <p className={styles.cardValue}>
//               <CountUp end={data.totalServices} duration={2.5} />
//             </p>
//           </div>
//           <div className={styles.card}>
//             <h2 className={styles.cardTitle}>{t("totalServicesRequested")}</h2>
//             <p className={styles.cardValue}>
//               <CountUp end={data.totalServicesRequested} duration={2.5} />
//             </p>
//           </div>
//           <div className={styles.card}>
//             <h2 className={styles.cardTitle}>{t("totalServicesConfirmed")}</h2>
//             <p className={styles.cardValue}>
//               <CountUp end={data.totalServicesConfirmed} duration={2.5} />
//             </p>
//           </div>
//           <div className={styles.card}>
//             <h2 className={styles.cardTitle}>{t("totalServicesCompleted")}</h2>
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





import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useTranslation } from 'react-i18next';
import styles from "./Overview.module.css";
import Navbar from "../Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import ChatBox from "../ChatBox/ChatBox";
import TranslateButton from "../TranslateButton/TranslateButton";

const Overview = () => {
  const { t, i18n } = useTranslation('overview');
  const user = JSON.parse(localStorage.getItem("loginusers"));
  const userName = user ? user.fullName : t('User');

  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const currentLanguage = i18n.language;

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
        setError(t("Error fetching data"));
      }
    };

    fetchData();
  }, [t]);

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
        setError(t("Error fetching data"));
      }
    };

    fetchUserData();
  }, [t]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = JSON.parse(localStorage.getItem("loginusers"));
  //     if (!user || !user._id) {
  //       console.error("User ID not found in localStorage");
  //       return;
  //     }

  //     const userId = user._id;
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5001/api/payment/viewBalance?userId=${userId}`
  //       );
  //       console.log(response);
  //       if (!response.ok) {
  //         throw new Error("Error fetching data");
  //       }
  //       const result = await response.json();
  //       console.log(result);
  //       console.log(result.success[0]);
  //       setUserData(result.success[0]);
  //       console.log(userData);
  //     } catch (err) {
  //       setError(t("Error fetching data"));
  //     }
  //   };

  //   fetchData();
  // }, [t]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("loginusers"));
      if (!user || !user._id) {
        console.error("User ID not found in localStorage");
        return;
      }
  
      const userId = user._id;
      try {
        const response = await fetch(`http://localhost:5001/api/payment/viewBalance?userId=${userId}`
);
        // if (!response.ok) {
        //   throw new Error("Error fetching data");
        // }
        const result = await response.json();
        if(result.length>0){
        setUserData(result.success);
        } // Assuming result.success is the correct format
      } catch (err) {
        setError(t("Error fetching data"));
      }
    };
  
    fetchData();
  }, [t]);
  
  useEffect(() => {
    // Log userData when it changes
    console.log("UserData has been updated:", userData);
  }, [userData]);
  

  if (error) {
    return <div>{error}</div>;
  }

  if (userProfile === null) {
    return <div>{t("Loading...")}</div>;
  }

  return (
    <div dir={currentLanguage === 'ur' ? 'rtl' : 'ltr'}>
      <Navbar />
      <TranslateButton/>
      <Dashboard />
      <div className={styles.header_overview}>
        <h1 className={styles.heading_overview}>
          <span className={styles.name_part}>{userName}, </span> 
          <span className={styles.wecome}>{t("welcome")} </span>
          <span>{t("to")}</span>
          <span>{t("dashboard")}</span>
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
            <h2 className={styles.cardTitle}>{t("totalServicesOffered")}</h2>
            <p className={styles.cardValue}>
              {!data ? <>50</> : <CountUp end={data.totalServices} duration={2.5} /> }
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t("totalServicesRequested")}</h2>
            <p className={styles.cardValue}>
            {!data ? <>35</> : <CountUp end={data.totalServicesRequested} duration={2.5} /> }
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t("totalServicesConfirmed")}</h2>
            <p className={styles.cardValue}>
            {!data ? <>25</> : <CountUp end={data.totalServicesConfirmed} duration={2.5} /> }
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t("totalServicesCompleted")}</h2>
            <p className={styles.cardValue}>
            {!data ? <>15</> : <CountUp end={data.totalServicesCompleted} duration={2.5} /> }
            </p>
          </div>
        </div>
        
      </div>
      <div className={styles.balanceSection}>
          <div className={styles.balanceCard}>
            <h2 className={styles.balanceTitle}>{t("Total Balance")}</h2>
            <p className={styles.balanceValue}>
              {!userData ? <> 0.00</> : <CountUp end={userData.totalBalance} duration={2.5} prefix="Rs" /> }
            </p>
            <button className={styles.cardButton}>{t("Withdraw")}</button>
          </div>
          <div className={styles.balanceCard}>
            <h2 className={styles.balanceTitle}>{t("Pending Withdraw")}</h2>
            <p className={styles.balanceValue}>
              {!userData ? <> 0.00</> : <CountUp end={userData.pendingWithdraw} duration={2.5} prefix="Rs" /> }
            </p>
            <button className={styles.cardButton}>{t("Pending")}</button>
          </div>
          <div className={styles.balanceCard}>
            <h2 className={styles.balanceTitle}>{t("Total Withdraw")}</h2>
            <p className={styles.balanceValue}>
              {!userData ? <> 0.00</> : <CountUp end={userData.withdrawn} duration={2.5} prefix="Rs" /> }
            </p>
            <button className={styles.cardButton}>{t("View Details")}</button>
          </div>
        </div>
      <ChatBox />
      <Footer />
    </div>
  );
};

export default Overview;
