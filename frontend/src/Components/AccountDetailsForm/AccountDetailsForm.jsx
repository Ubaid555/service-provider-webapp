import React, { useState } from 'react';
import styles from './AccountDetailsForm.module.css';
import Navbar from '../Navbar/Navbar';
import ChatBox from '../ChatBox/ChatBox';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';

const AccountDetailsForm = () => {
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ accountHolderName, accountNumber, paymentMethod });
    };

    return (
        <>
        <Navbar/>
        <ChatBox/>
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Account Details</h2>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="accountHolderName" className={styles.label}>Account Holder Name</label>
                    <input
                        type="text"
                        id="accountHolderName"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="accountNumber" className={styles.label}>Account Number</label>
                    <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Payment Method</label>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="easypaisa"
                                checked={paymentMethod === 'easypaisa'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className={styles.radioInput}
                            />
                            Easypaisa
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="jazzcash"
                                checked={paymentMethod === 'jazzcash'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className={styles.radioInput}
                            />
                            JazzCash
                        </label>
                    </div>
                </div>

                <NavLink to="">
                    <button type="submit" className={styles.button}>Send</button>
                </NavLink>
            </form>
        </div>
        <Footer/>
        </>
    );
};

export default AccountDetailsForm;
