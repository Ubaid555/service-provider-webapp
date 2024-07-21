import React, { useState, useEffect } from 'react';
import styles from './WithdrawRequests.module.css';
import AdminNavbar from '../Admin Navbar/AdminNavbar';
import WithdrawCredentialsModal from '../../AllModals/WithdrawCredentialsModal/WithdrawCredentialsModal'; 
import RequestConfirmModal from '../../AllModals/RequestConfirmModal/RequestConfirmModal';

const WithdrawRequests = () => {
    const user = JSON.parse(localStorage.getItem("loginusers"));
    const userName = user ? user.fullName : "User";

    const [userId, setUserId] = useState("");
    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [requestToApprove, setRequestToApprove] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [requestToView, setRequestToView] = useState(null);

    useEffect(() => {
        document.title = 'Trusty Taskers - Withdraw Requests';
      }, []);
    

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
            setUserId(storedUser._id);
        }
    }, []);

    useEffect(() => {
        const fetchWithdrawRequests = async () => {
            try {
                let response = await fetch('http://localhost:5001/api/payment/viewWithdrawRequest', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                let result = await response.json();
                console.log(result);
                setWithdrawRequests(result.success || []);
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
                let update = await fetch('http://localhost:5001/api/payment/handleWithdraw', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ amountToWithdraw: requestId.amountToWithdraw, currentUser: requestId.userId })
                });

                if (!update.ok) {
                    throw new Error('Network response was not ok');
                }

                let result = await update.json();
                if (result.success) {
                    const updatedRequests = withdrawRequests.map((request) => 
                        request._id === requestId._id ? { ...request, withdrawStatus: "approved" } : request
                    );
                    setWithdrawRequests(updatedRequests);
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

    const viewDetails = (request) => {
        setRequestToView(request);
        setShowDetailsModal(true);
    };

    const handleDetailsClose = () => {
        setRequestToView(null);
        setShowDetailsModal(false);
    };

    // Sorting the withdrawRequests array to ensure the newest requests are at the top
    const sortedWithdrawRequests = [...withdrawRequests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <>
            <AdminNavbar />
            <h1 className={styles.main_heading}>{userName}'s Withdraw Requests</h1>
            <div className={styles.bookingsContainer}>
                <table className={styles.bookingsTable}>
                    <thead>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>Name</th>
                            <th className={styles.tableHeader}>Payment Method</th>
                            <th className={styles.tableHeader}>Status</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedWithdrawRequests.length > 0 ? (
                            sortedWithdrawRequests.map((request) => (
                                <tr key={request._id} className={styles.tableRow}>
                                    <td className={styles.tableCell}>{request.name}</td>
                                    <td className={styles.tableCell}>{request.withdrawMethod}</td>
                                    <td className={styles.tableCell}>
                                        <span className={`${styles.statusBadge} ${styles[request.withdrawStatus]}`}>{request.withdrawStatus}</span>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <button className={styles.actionButton} onClick={() => viewDetails(request)}>View Details</button>
                                        {request.withdrawStatus === "pending" && (
                                            <button className={styles.actionButton} onClick={() => confirmApproveRequest(request)}>Approve</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.tableRow}>
                                <td colSpan="4" className={styles.noBookings}>No withdrawal requests found</td>
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

            {showDetailsModal && (
                <WithdrawCredentialsModal
                    request={requestToView}
                    onClose={handleDetailsClose}
                />
            )}
        </>
    );
};

export default WithdrawRequests;
