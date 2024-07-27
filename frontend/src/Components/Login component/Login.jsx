import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import Navbar from "../Navbar/Navbar";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useTranslation } from "react-i18next";
import TranslateButton from "../TranslateButton/TranslateButton";

export const Login = () => {
  const { t, i18n } = useTranslation(["login", "common"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("loginusers");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Trusty Taskers - Login";
  }, [t]);

  const handleLogin = async () => {
    toast.dismiss(); 

    if (!email && !password) {
      toast.error(t("pleaseFillInAllFields"));
      return;
    }

    try {
      let response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();

      if (response.status === 201 && result.fullName) {
        localStorage.setItem("loginusers", JSON.stringify(result));
        const role = result.role;
        toast.success(t("loginSuccessful"));
        setTimeout(() => {
          if (role === "user") {
            navigate("/overview");
          } else if (role === "admin") {
            navigate("/adminoverview");
          }
        }, 1000); // Redirect after 1 second
      } else if (response.status === 404) {
        toast.error(t("userNotRegistered"));
      } else if (response.status === 401) {
        toast.error(t("incorrectPassword"));
      } else {
        toast.error(t("incorrectCredentials"));
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(t("somethingWentWrong"));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <TranslateButton />
      <div
        className={`${styles.whole_contents} ${
          i18n.language === "ur" ? styles.rtl : ""
        }`}
      >
        <div className={styles.container}>
          <div className={styles.login}>
            <h1 className={styles.text}>{t("login")}</h1>
            <div className={styles.underline}></div>

            <div className={styles.inputs}>
              <div className={styles.input}>
                <img src={email_icon} alt="" className={styles.inputImg} />
                <input
                  className={styles.inputBox}
                  type="text"
                  placeholder={t("enterEmail")}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className={styles.input}>
                <img src={password_icon} alt="" className={styles.inputImg} />
                <input
                  className={styles.inputBox}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("enterPassword")}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} ${
                    styles.eyeIcon
                  } ${i18n.language === "ur" ? styles.rtlIcon : ""}`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>

            <div className={styles.forgot_password}>
              {t("forgotPassword")}?
              <NavLink to="/forgotpassword">
                <span>{t("clickHere")}</span>
              </NavLink>
            </div>

            <NavLink className={styles.appButton} onClick={handleLogin}>
              {t("login")}
            </NavLink>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
