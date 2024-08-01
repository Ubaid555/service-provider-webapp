import React, { useState, useEffect } from "react";
import styles from "./AccountDetailsForm.module.css";
import Navbar from "../Navbar/Navbar";
import ChatBox from "../ChatBox/ChatBox";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AccountDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalBalance } = location.state || {};

  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!totalBalance) {
      navigate("/overview");
    }
  });

  useEffect(() => {
    document.title = "Trusty Taskers - Account Details";
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountHolderName) {
      toast.error("Account Holder Name cannot be empty");
      return;
    }
    if (!accountNumber || parseInt(accountNumber) <= 0) {
      toast.error("Account Number must be a positive number");
      return;
    }
    if (!amount || parseInt(amount) <= 0) {
      toast.error("Amount must be a positive number");
      return;
    }
    if (accountNumber.toString().length !== 11) {
        toast.error('Account number length should be 11');
        return;
    }
    if (parseInt(amount) > totalBalance) {
      toast.error("Balance not enough");
      return;
    }
    if (!paymentMethod) {
      toast.error("Payment Method cannot be empty");
      return;
    }

    const requestData = {
      userId: userId,
      holdername: accountHolderName,
      name: fullName,
      accountNumber,
      accountHolderName,
      amountToWithdraw: parseInt(amount),
      withdrawMethod: paymentMethod,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/payment/withdrawRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setAccountHolderName("");
        setFullName("");
        setAccountNumber("");
        setPaymentMethod("");
        setAmount("");

        setTimeout(() => {
          navigate("/overview");
        }, 2000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error in withdraw request", error);
      toast.error("An error occurred while processing the withdraw request");
    }
  };

  return (
    <>
      <Navbar />
      <ChatBox />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Account Details</h2>
          <h3 className={styles.balanceDisplay}>
            Total Balance: Rs {totalBalance}
          </h3>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="accountHolderName" className={styles.label}>
              Account Holder Name
            </label>
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
            <label htmlFor="accountNumber" className={styles.label}>
              Account Number
            </label>
            <input
              type="number"
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="amount" className={styles.label}>
              Amount
            </label>
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
                  value="EasyPaisa"
                  checked={paymentMethod === "EasyPaisa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={styles.radioInput}
                />
                Easypaisa
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="JazzCash"
                  checked={paymentMethod === "JazzCash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={styles.radioInput}
                />
                JazzCash
              </label>
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default AccountDetailsForm;
