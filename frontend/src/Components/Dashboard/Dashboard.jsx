import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Dashboard.module.css";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { t, i18n } = useTranslation("dashboard");

  const currentLanguage = i18n.language;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    document.title = t("title");
  }, [i18n.language, t]);

  return (
    <>
      <Navbar />
      <div
        dir={currentLanguage === "ur" ? "rtl" : "ltr"}
        className={styles.dashboard}
      >
        <nav className={`${styles.navbar} ${showMenu ? styles.showMenu : ""}`}>
          <button
            className={`${styles.menuButton} ${
              showMenu ? styles.closeButton : ""
            }`}
            onClick={toggleMenu}
          >
            {showMenu ? (
              <>
                <i
                  className="fa fa-times ico"
                  style={{ marginRight: "10px" }}
                ></i>{" "}
                {t("close")}
              </>
            ) : (
              <>
                <i
                  className="fa fa-bars ico"
                  style={{ marginRight: "10px" }}
                ></i>{" "}
                {t("dashboardMenu")}
              </>
            )}
          </button>

          <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{
                backgroundColor: "#d01c28",
                color: "white",
                border: "none",
              }}
            >
              <i className="fa fa-book" style={{ marginRight: "10px" }}></i>{" "}
              {t("manageBookings")}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item
                as={NavLink}
                to="/mybookings"
                className={styles.dropdown_item}
              >
                <i className="fa fa-list" style={{ marginRight: "10px" }}></i>{" "}
                {t("bookingRequests")}
              </Dropdown.Item>
              <Dropdown.Item
                as={NavLink}
                to="/managerequests"
                className={styles.dropdown_item}
              >
                <i className="fa fa-clock" style={{ marginRight: "10px" }}></i>{" "}
                {t("pendingRequests")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
      </div>
    </>
  );
};

export default Dashboard;
