import React, { useState, useEffect } from "react";
import styles from "./UserWithdrawHistory.module.css";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "../ChatBox/ChatBox";

const UserWithdrawHistory = () => {
  const [userId, setUserId] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    document.title = "Trusty Taskers - Withdraw History";
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    const fetchWithdrawHistory = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:5001/api/payment/withdrawHistory?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.error || "Network response was not ok");
        }

        const result = await response.json();
        setWithdrawHistory(result.data || []);
      } catch (error) {
        console.error("Error fetching withdraw history:", error);
        // setError(error.message);
        // toast.error('Error fetching withdraw history');
      }
    };

    fetchWithdrawHistory();
  }, [userId]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredWithdrawHistory = selectedDate
    ? withdrawHistory.filter((withdrawal) => {
        const withdrawalDate = new Date(withdrawal.updatedAt)
          .toISOString()
          .split("T")[0];
        return withdrawalDate === selectedDate;
      })
    : withdrawHistory;

  return (
    <>
      <Navbar />
      <ChatBox />
      <h1 className={styles.main_heading}>Withdraw History</h1>
      <div className={styles.filterContainer}>
        <label htmlFor="dateFilter" className={styles.dateLabel}>
          Search by date:
        </label>
        <input
          type="date"
          id="dateFilter"
          className={styles.dateInput}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className={styles.bookingsContainer}>
        <table className={styles.bookingsTable}>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>Amount</th>
              <th className={styles.tableHeader}>Account Number</th>
              <th className={styles.tableHeader}>Method</th>
              <th className={styles.tableHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredWithdrawHistory.length > 0 ? (
              filteredWithdrawHistory.map((withdrawal) => (
                <tr key={withdrawal._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{withdrawal.name}</td>
                  <td className={styles.tableCell}>
                    {withdrawal.amountToWithdraw}
                  </td>
                  <td className={styles.tableCell}>
                    {withdrawal.accountNumber}
                  </td>
                  <td className={styles.tableCell}>
                    {withdrawal.withdrawMethod}
                  </td>
                  <td className={styles.tableCell}>
                    {new Date(withdrawal.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr className={styles.tableRow}>
                <td colSpan="5" className={styles.noBookings}>
                  No withdrawal history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      <ChatBox />
    </>
  );
};

export default UserWithdrawHistory;
