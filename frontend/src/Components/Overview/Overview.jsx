import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import styles from "./Overview.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ChatBox from "../ChatBox/ChatBox";
import TranslateButton from "../TranslateButton/TranslateButton";
import { NavLink, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Overview = () => {
  const { t, i18n } = useTranslation("overview");
  const user = JSON.parse(localStorage.getItem("loginusers"));
  const userName = user ? user.fullName : t("User");

  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const currentLanguage = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trusty Taskers - Dashboard";
  }, []);

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
          `${BASE_URL}/overview/overviewAllServices?userId=${userId}`
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
          `${BASE_URL}/overview/overviewUserServices?userId=${userId}`
        );
        const result = await response.json();
        if (result.success) {
          setUserData(result.success[0]);
        }
      } catch (err) {
        setError(t("Error fetching data"));
      }
    };

    fetchUserData();
  }, [t]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("loginusers"));
      if (!user || !user._id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const userId = user._id;
      try {
        const response = await fetch(
          `${BASE_URL}/payment/viewBalance?userId=${userId}`
        );
        const result = await response.json();
        console.log(result);
        if (result.success) {
          setUserData(result.success);
        }
      } catch (err) {
        setError(t("Error fetching data"));
      }
    };

    fetchData();
  }, [t]);

  useEffect(() => {
    console.log("UserData has been updated:", userData);
  }, [userData]);

  if (error) {
    return <div>{error}</div>;
  }

  if (userProfile === null) {
    return <div>{t("Loading...")}</div>;
  }

  const handleNavigate = () => {
    navigate("/accountdetails", {
      state: { totalBalance: userData?.totalBalance || 0 },
    });
  };

  return (
    <div dir={currentLanguage === "ur" ? "rtl" : "ltr"}>
      <Navbar />
      <TranslateButton />
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
              {!data ? (
                <>50</>
              ) : (
                <CountUp end={data.totalServices} duration={2.5} />
              )}
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t("totalServicesRequested")}</h2>
            <p className={styles.cardValue}>
              {!data ? (
                <>35</>
              ) : (
                <CountUp end={data.totalServicesRequested} duration={2.5} />
              )}
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t("totalServicesConfirmed")}</h2>
            <p className={styles.cardValue}>
              {!data ? (
                <>25</>
              ) : (
                <CountUp end={data.totalServicesConfirmed} duration={2.5} />
              )}
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t("totalServicesCompleted")}</h2>
            <p className={styles.cardValue}>
              {!data ? (
                <>15</>
              ) : (
                <CountUp end={data.totalServicesCompleted} duration={2.5} />
              )}
            </p>
          </div>
        </div>
      </div>
      {userData && (
        <div className={styles.balanceSection}>
          <div className={styles.balanceCard}>
            <h2 className={styles.balanceTitle}>{t("Total Balance")}</h2>
            <p className={styles.balanceValue}>
              {!userData ? (
                <>0.00</>
              ) : (
                <CountUp
                  end={userData.totalBalance}
                  duration={2.5}
                  prefix="Rs"
                />
              )}
            </p>
            <button onClick={handleNavigate} className={styles.cardButton}>
              {t("Withdraw")}
            </button>
          </div>
          <div className={styles.balanceCard}>
            <h2 className={styles.balanceTitle}>{t("Pending Withdraw")}</h2>
            <p className={styles.balanceValue}>
              {!userData ? (
                <>0.00</>
              ) : (
                <CountUp
                  end={userData.pendingWithdraw}
                  duration={2.5}
                  prefix="Rs"
                />
              )}
            </p>
          </div>
          <div className={styles.balanceCard}>
            <h2 className={styles.balanceTitle}>{t("Total Withdraw")}</h2>
            <p className={styles.balanceValue}>
              {!userData ? (
                <>0.00</>
              ) : (
                <CountUp end={userData.withdrawn} duration={2.5} prefix="Rs" />
              )}
            </p>
            <NavLink to="/userwithdrawhistory">
              <button className={styles.cardButton}>{t("View Details")}</button>
            </NavLink>
          </div>
        </div>
      )}
      <ChatBox />
      <Footer />
    </div>
  );
};

export default Overview;
