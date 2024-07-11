import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Login component/Login.module.css";
import Navbar from "../Navbar/Navbar";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("loginusers");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Trusty Tasker - Forgot Password";
  }, []);

  const handleSubmit = async () => {
    let response = await fetch(
      `http://localhost:5001/api/auth/forgotPassword?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let result = await response.json();
    console.warn(result);

    if (response.status === 400) {
      toast.error(result.message);
    } else if (response.status === 200) {
      toast.success(result.message);
      setIsSubmit(true);
    }
  };

  const verifyOtp = async () => {
    try {
      let response = await fetch("http://localhost:5001/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      if (response.status === 400) {
        toast.error(result.error);
      } else if (response.status === 200) {
        toast.success(result.message);
        setOtpVerified(true);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;
      default:
        break;
    }
  };

  const updatePassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      let response = await fetch('http://localhost:5001/api/auth/resetPassword', {
        method: 'PUT',
        body: JSON.stringify({
          email,
          newPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let result = await response.json();
      if (response.status === 400) {
        toast.error(result.message);
    } else if (response.status === 404) {
        toast.error(result.message);
    } else if (response.status === 200) {
        toast.success(result.message);
        navigate("/login")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.login}>
          {isSubmit ? (
            <React.Fragment>
              {otpVerified ? (
                <React.Fragment>
                  <h1 className={styles.heading_main}>Update Password</h1>
                  <div className={styles.container}>
                    <div className={styles.imageContainer}>
                      <img
                        src="/Images/change password.png"
                        height="300px"
                        width="300px"
                        alt="Update Password"
                        className={styles.image_pass}
                      />
                    </div>
                    <div className={styles.form_control}>
                      <label htmlFor="password">New Password</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="**********"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={styles.input}
                        />
                        <i
                          className={`fa ${
                            showNewPassword ? "fa-eye-slash" : "fa-eye"
                          } ${styles.eyeIcon}`}
                          onClick={() => togglePasswordVisibility("new")}
                        />
                      </div>
                    </div>

                    <div className={styles.form_control}>
                      <label htmlFor="password">Confirm New Password</label>
                      <div className={styles.passwordInput}>
                        <input
                          type={showConfirmNewPassword ? "text" : "password"}
                          placeholder="**********"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          className={styles.input}
                        />
                        <i
                          className={`fa ${
                            showConfirmNewPassword ? "fa-eye-slash" : "fa-eye"
                          } ${styles.eyeIcon}`}
                          onClick={() => togglePasswordVisibility("confirm")}
                        />
                      </div>
                    </div>

                    <button onClick={updatePassword} className={styles.button}>
              Update Password
            </button>

                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h1 className={styles.text}>Verify OTP</h1>
                  <p>
                    We have sent an OTP code to {email}. Verify your email by
                    putting an OTP code
                  </p>
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
                        placeholder="Enter OTP"
                      />
                    </div>
                  </div>
                  <NavLink className={styles.appButton} onClick={verifyOtp}>
                    Verify OTP
                  </NavLink>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1 className={styles.text}>FORGOT PASSWORD</h1>
              <div className={styles.underline}></div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <img src={email_icon} alt="" className={styles.inputImg} />
                  <input
                    className={styles.inputBox}
                    type="text"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <NavLink className={styles.appButton} onClick={handleSubmit}>
                SUBMIT
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
};
