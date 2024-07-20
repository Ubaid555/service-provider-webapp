import React, { useState, useEffect } from 'react';
import styles from './WithdrawRequests.module.css'; // Assuming the same CSS module is used
import AdminNavbar from '../Admin Navbar/AdminNavbar';
import RequestConfirmModal from '../../AllModals/RequestConfirmModal/RequestConfirmModal'; // Reuse or create as needed

const WithdrawRequests = () => {
    const user = JSON.parse(localStorage.getItem("loginusers"));
    const userName = user ? user.fullName : "User";

    const [userId, setUserId] = useState("");
    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [requestToApprove, setRequestToApprove] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
            setUserId(storedUser._id);
        }
    }, []);

    useEffect(() => {
        const fetchWithdrawRequests = async () => {
            try {
                let response = await fetch(`http://localhost:5001/api/payment/viewWithdrawRequest`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                let result = await response.json();
                console.log(result);
                const pendingRequests = result.success.filter(request => request.withdrawStatus === "pending");
                
                setWithdrawRequests(pendingRequests);
            } catch (error) {
                console.error("Error fetching withdrawal requests:", error);
            }
        };

        if (userId) {
            fetchWithdrawRequests();
        }
    }, [userId]);

    const handleApproveRequest = async (requestId) => {
       
        if (requestId) {
            try {
                let update = await fetch(`http://localhost:5001/api/payment/handleWithdraw`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ amountToWithdraw:requestId.amountToWithdraw, currentUser:requestId.userId })
                });

                let result = await update.json();
                if (result.success) {
                    window.location.reload();
                }
            } catch (error) {
                console.error("Error updating withdrawal request status:", error);
            }
        }
    };

    const confirmApproveRequest = (request) => {
        setRequestToApprove(request);
        setShowConfirmModal(true);
    };

    const handleApproveConfirm = () => {
        if (requestToApprove) {
            handleApproveRequest(requestToApprove);
        }
        setShowConfirmModal(false);
    };

    const handleApproveCancel = () => {
        setRequestToApprove(null);
        setShowConfirmModal(false);
    };

    return (
        <>
            <AdminNavbar />
            <h1 className={styles.main_heading}>{userName}'s Withdraw Requests</h1>
            <div className={styles.bookingsContainer}>
                <table className={styles.bookingsTable}>
                    <thead>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>Name</th>
                            <th className={styles.tableHeader}>Account Holder Name</th>
                            <th className={styles.tableHeader}>Account Number</th>
                            <th className={styles.tableHeader}>Amount</th>
                            <th className={styles.tableHeader}>Payment Method</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawRequests.length > 0 ? (
                            withdrawRequests.map((request) => (
                                <tr key={request._id} className={styles.tableRow}>
                                    <td className={styles.tableCell}>{request.name}</td>
                                    <td className={styles.tableCell}>{request.accountHolderName}</td>
                                    <td className={styles.tableCell}>{request.accountNumber}</td>
                                    <td className={styles.tableCell}>{request.amountToWithdraw}</td>
                                    <td className={styles.tableCell}>{request.withdrawMethod}</td>
                                    <td className={styles.tableCell}>
                                        <button className={styles.actionButton} onClick={() => confirmApproveRequest(request)}>Approve</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.tableRow}>
                                <td colSpan="6" className={styles.noBookings}>No withdrawal requests found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showConfirmModal && (
                <RequestConfirmModal
                    show={showConfirmModal}
                    onConfirm={handleApproveConfirm}
                    onCancel={handleApproveCancel}
                />
            )}
        </>
    );
};

export default WithdrawRequests;
