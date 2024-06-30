import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from "../Login component/Login.module.css";
import Navbar from '../Navbar/Navbar';
import email_icon from '../Assets/email.png';

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("loginusers");
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = "Trusty Tasker - Forgot Password";
    }, []);

    const handleLogin = async () => {
        setErrorMessage(""); // Clear previous error message

        let response = await fetch('http://localhost:4500/forgotpassword', {
            method: 'post',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let result = await response.json();
        console.warn(result);

        if (response.status === 200 && result.name) {
            localStorage.setItem("loginusers", JSON.stringify(result));
            navigate('/');
        } else if (response.status === 404) {
            setErrorMessage("This user is not registered");
        } else if (response.status === 401) {
            setErrorMessage("Please enter the correct password");
        } else {
            setErrorMessage("Please enter correct credentials");
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.login}>
                    <h1 className={styles.text}>FORGOT PASSWORD</h1>
                    <div className={styles.underline}></div>

                    <div className={styles.inputs}>
                        <div className={styles.input}>
                            <img src={email_icon} alt='' className={styles.inputImg} />
                            <input className={styles.inputBox}
                                type='text'
                                placeholder='Enter your Email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email} />
                        </div>
                    </div>

                    <NavLink className={styles.appButton} onClick={handleLogin}>SUBMIT</NavLink>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </div>
            </div>
        </>
    )
}
