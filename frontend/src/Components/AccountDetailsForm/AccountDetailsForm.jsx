import React, { useState, useEffect } from 'react';
import styles from './AccountDetailsForm.module.css';
import Navbar from '../Navbar/Navbar';
import ChatBox from '../ChatBox/ChatBox';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountDetailsForm = () => {
    const location = useLocation();
    const { totalBalance } = location.state || { totalBalance: 0 };

    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        document.title = "Trusty Taskers - Account Details";
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!accountHolderName) {
            toast.error('Account Holder Name cannot be empty');
            return;
        }
        if (!accountNumber || parseInt(accountNumber) <= 0) {
            toast.error('Account Number must be a positive number');
            return;
        }
        if (!amount || parseInt(amount) <= 0) {
            toast.error('Amount must be a positive number');
            return;
        }
        if (accountNumber.toString().length !== 11) {
            toast.error('Account number length should be 11');
            return;
        }
        if (parseInt(amount) > totalBalance) {
            toast.error('Balance not enough');
            return;
        }
        if (!paymentMethod) {
            toast.error('Payment Method cannot be empty');
            return;
        }
        console.log({ accountHolderName, accountNumber, paymentMethod, amount });
    };

    return (
        <>
            <Navbar />
            <ChatBox />
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.title}>Account Details</h2>
                    <h3 className={styles.balanceDisplay}>Total Balance: Rs {totalBalance}</h3>
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
                            type="number"
                            id="accountNumber"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className={styles.input}
                            max='11'
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="amount" className={styles.label}>Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={styles.input}
                            min="1"
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

                    <button type="submit" onClick={handleSubmit} className={styles.button}>Send</button>
                </form>
            </div>
            <ToastContainer />
            <Footer />
        </>
    );
};

export default AccountDetailsForm;
