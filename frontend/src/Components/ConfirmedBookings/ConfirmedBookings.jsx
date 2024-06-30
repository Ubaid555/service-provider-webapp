import React, { useState, useEffect } from 'react';
import styles from './ConfirmedBookings.module.css';
import Navbar from '../Navbar/Navbar';
import PendingDetailsModal from '../AllModals/PendingDetailsModal/PendingDetailsModal';
import CompleteBookingModal from '../AllModals/CompleteBookingModal/CompleteBookingModal';
import Dashboard from '../Dashboard/Dashboard';
import CancelPendingModal from '../AllModals/CancelPendingModal/CancelPendingModal'; 

const ConfirmedBookings = () => {
    const user = JSON.parse(localStorage.getItem("loginusers"));
    const userName = user ? user.name : "User";

    const [userId, setUserId] = useState("");
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null); // State to manage selected booking
    const [showModal, setShowModal] = useState(false); // State to manage details modal visibility
    const [showCompleteModal, setShowCompleteModal] = useState(false); // State to manage complete modal visibility
    const [bookingToComplete, setBookingToComplete] = useState(null); // State to manage booking to be completed
    const [showCancelModal, setShowCancelModal] = useState(false); // State to manage cancel modal visibility

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
            setUserId(storedUser._id);
        }
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                let response = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=Confirmed`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                let result = await response.json();
                if(result.success){setBookings(result.success);}
                else{console.log(result.error)};
                
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        if (userId) {
            fetchBookings();
        }
    }, [userId]);

    const handleRejectRequest = async (bookingId, status) => {
        if (bookingId && status) {
            try {
                let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ currentStatus: status,userId,bookingId })
                });

                let result = await update.json();
                if (result.success) {
                    window.location.reload();
                }
                
            } catch (error) {
                console.error("Error updating booking status:", error);
            }
        }
    };

    const viewDetails = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true); // Show the modal when viewing details
    };

    const closeDetails = () => {
        setSelectedBooking(null);
        setShowModal(false); // Close the modal
    };

    const confirmCompleteRequest = (booking) => {
        setBookingToComplete(booking);
        setShowCompleteModal(true); // Show the complete modal
    };

    const handleConfirm = () => {
        if (bookingToComplete) {
            handleRejectRequest(bookingToComplete._id, "Completed");
        }
        setShowCompleteModal(false); // Close the complete modal
    };

    const handleCancel = () => {
        setBookingToComplete(null);
        setShowCompleteModal(false); // Close the complete modal
    };

    const handleRejectWithConfirmation = (bookingId) => {
        setBookingToComplete(bookingId);
        setShowCancelModal(true); // Show the cancel modal
    };

    const handleCancelConfirm = () => {
        if (bookingToComplete) {
            handleRejectRequest(bookingToComplete, "Cancelled");
        }
        setShowCancelModal(false); // Close the cancel modal
    };

    const handleCancelCancel = () => {
        setShowCancelModal(false); // Close the cancel modal
    };

    return (
        <>
            <Navbar />
            <Dashboard />
            <h1 className={styles.main_heading}>{userName}'s Ongoing Services</h1>
            <div className={styles.bookingsContainer}>
                <table className={styles.bookingsTable}>
                    <thead>
                        <tr className={styles.tableRow}>
                            <th className={styles.tableHeader}>Service Name</th>
                            <th className={styles.tableHeader}>Requester Name</th>
                            <th className={styles.tableHeader}>Status</th>
                            <th className={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking._id} className={styles.tableRow}>
                                    <td className={styles.tableCell}>{booking.category}</td>
                                    <td className={styles.tableCell}>{booking.serviceTakerName}</td>
                                    <td className={styles.tableCell}>{booking.currentStatus}</td>
                                    <td className={styles.tableCell}>
                                        <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
                                        <button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button>
                                        <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.tableRow}>
                                <td colSpan="4" className={styles.noBookings}>No bookings found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <PendingDetailsModal booking={selectedBooking} onClose={closeDetails} />
            )}
            {showCompleteModal && (
                <CompleteBookingModal
                    show={showCompleteModal}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            {showCancelModal && (
                <CancelPendingModal
                    show={showCancelModal}
                    onConfirm={handleCancelConfirm}
                    onCancel={handleCancelCancel}
                />
            )}
        </>
    );
};

export default ConfirmedBookings;