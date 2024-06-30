import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';
import styles from './SecondCounter.module.css';

const SecondCounter = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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

  if (!userData) {
    // return <div>Loading...</div>;
    return null;
  }

  return (
    <div className={styles.overviewWrapper}>
          <div className={styles.overview_container}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Your Total No. of Services Offered</h2>
              <p className={styles.cardValue}>
                <CountUp end={userData.totalServices} duration={2.5} />
              </p>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Your Total Services Requested</h2>
              <p className={styles.cardValue}>
                <CountUp end={userData.totalServicesRequested} duration={2.5} />
              </p>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Your Total Services Confirmed</h2>
              <p className={styles.cardValue}>
                <CountUp end={userData.totalServicesConfirmed} duration={2.5} />
              </p>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Your Total Services Completed</h2>
              <p className={styles.cardValue}>
                <CountUp end={userData.totalServicesCompleted} duration={2.5} />
              </p>
            </div>
          </div>
        </div>
  );
};

export default SecondCounter;