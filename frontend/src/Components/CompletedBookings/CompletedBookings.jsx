import React, { useState, useEffect } from 'react';
import styles from './CompletedBookings.module.css';
import Navbar from '../Navbar/Navbar';
import PendingDetailsModal from '../AllModals/PendingDetailsModal/PendingDetailsModal';

const CompletedBookings = () => {
  const user = JSON.parse(localStorage.getItem("loginusers"));
  const userName = user ? user.name : "User";

  const [userId, setUserId] = useState("");
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null); // State to manage selected booking
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("loginusers"));
      if (storedUser && storedUser._id) {
          setUserId(storedUser._id);
      }
  }, []);

  useEffect(() => {
      const fetchBookings = async () => {
          try {
              let response = await fetch(`http://localhost:4500/showBookingRequestsConfirmed?userId=${userId}&status=Completed`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              });
              let result = await response.json();
              setBookings(result);
          } catch (error) {
              console.error("Error fetching bookings:", error);
          }
      };
      if (userId) {
          fetchBookings();
      }
  }, [userId]);

  const viewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true); // Show the modal when viewing details
};

const closeDetails = () => {
    setSelectedBooking(null);
    setShowModal(false); // Close the modal
};

  return (
        <>
            <Navbar />
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
                                        {/* //<button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button>
                                       // <button className={styles.actionButton} onClick={() => handleAcceptRequest(booking._id, "Cancelled")}>Reject</button>  */}
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
            
        </>
    );
};

export default CompletedBookings;