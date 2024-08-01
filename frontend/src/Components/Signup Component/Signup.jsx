import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import styles from "./Signup.module.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import phone_icon from "../Assets/phone.png";
import password_icon from "../Assets/password.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase";
import TranslateButton from "../TranslateButton/TranslateButton";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Signup = () => {
  const { t, i18n } = useTranslation(["signup", "common"]);
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [profilePic, setImage] = useState(null);
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("loginusers");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Trusty Tasker - Signup";
  }, []);

  useEffect(() => {
    document.body.dir = i18n.language === "ur" ? "rtl" : "ltr";
  }, [i18n.language]);

  const collectData = async () => {
    if (!fullName && !email && !phone && !password && !confirmPassword) {
      toast.error(t("pleaseFillInAllFields"));
      return;
    }

    if (fullName.length < 4 || fullName.length > 20) {
      toast.error(t("nameLength"));
      return;
    }

    const namePattern = /^[A-Za-z ]+$/;
    if (!namePattern.test(fullName)) {
      toast.error(t("namePattern"));
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      toast.error(t("emailPattern"));
      return;
    }

    const phonePattern = /^\d{11}$/;
    if (!phonePattern.test(phone)) {
      toast.error(t("phonePattern"));
      return;
    }

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      toast.error(t("pleaseFillInAllFields"));
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(t("passwordPattern"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }

    if (!profilePic) {
      toast.error(t("chooseProfileImage"));
      return;
    }

    setLoading(true);
    try {
      const imageRef = ref(storage, `images/${profilePic.name}`);
      await uploadBytes(imageRef, profilePic);
      const imageURL = await getDownloadURL(imageRef);
      console.log(imageURL);
      setVerified(true);
      let response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          confirmPassword,
          profilePic: imageURL,
          verified,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (response.status === 400) {
        toast.error(result.error);
      } else {
        toast.success(t("otpSent"));
        setStep(2);
      }
    } catch (error) {
      toast.error(t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      let response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (response.status === 400) {
        toast.error(result.error);
      } else {
        localStorage.setItem("loginusers", JSON.stringify(result));
        toast.success(t("registrationSuccessful"));
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(t("somethingWentWrong"));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Navbar />
      <TranslateButton />
      <div
        className={`${styles.whole_content} ${
          i18n.language === "ur" ? styles.rtl : ""
        }`}
      >
        <div className={styles.signupContainer}>
          <div className={styles.register}>
            {step === 1 && (
              <>
                <h1 className={styles.text}>{t("register")}</h1>
                <div className={styles.inputs}>
                  <div className={styles.input}>
                    <img src={user_icon} alt="" className={styles.inputImg} />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("enterName")}
                    />
                  </div>
                  <div className={styles.input}>
                    <img src={email_icon} alt="" className={styles.inputImg} />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("enterEmail")}
                    />
                  </div>
                  <div className={styles.input}>
                    <img
                      src={phone_icon}
                      width="21px"
                      height="25px"
                      alt=""
                      className={styles.inputImg}
                    />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("enterPhone")}
                    />
                  </div>
                  <div
                    className={`${styles.input} ${
                      i18n.language === "ur" ? styles.rtlInput : ""
                    }`}
                  >
                    <img
                      src={password_icon}
                      alt="password-img"
                      className={styles.inputImg}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("enterPassword")}
                    />
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } ${styles.eyeIcon} ${
                        i18n.language === "ur" ? styles.rtlIcon : ""
                      }`}
                      onClick={togglePasswordVisibility}
                    ></i>
                  </div>
                  <div
                    className={`${styles.input} ${
                      i18n.language === "ur" ? styles.rtlInput : ""
                    }`}
                  >
                    <img
                      src={password_icon}
                      alt="password-img"
                      className={styles.inputImg}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t("confirmPassword")}
                    />
                    <i
                      className={`fa ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      } ${styles.eyeIcon} ${
                        i18n.language === "ur" ? styles.rtlIcon : ""
                      }`}
                      onClick={toggleConfirmPasswordVisibility}
                    ></i>
                  </div>
                  <div className={styles.file}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                {loading ? (
                  <Loader />
                ) : (
                  <NavLink onClick={collectData} className={styles.appButton}>
                    {t("signUp")}
                  </NavLink>
                )}
              </>
            )}
            {step === 2 && (
              <>
                <div className={styles.verify_content}>
                  <img
                    className={styles.verify_photo}
                    src="Images/verify.png"
                    alt="verify-img"
                    width="200px"
                    height="200px"
                  />
                  <h1 className={styles.text}>{t("verifyOtp")}</h1>
                  <p>{t("otpSentTo", { email })}</p>
                  <div className={styles.inputs}>
                    <div className={styles.input}>
                      <img
                        src={password_icon}
                        alt="password-img"
                        className={styles.inputImg}
                      />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder={t("enterOtp")}
                      />
                    </div>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : (
                    <NavLink onClick={verifyOtp} className={styles.appsButton}>
                      {t("verify")}
                    </NavLink>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
