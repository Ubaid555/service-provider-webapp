import React, { useState, useEffect } from "react";
import styles from "./MyBookings.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import BookingDetailsModal from "../AllModals/BookingDetailsModal/BookingDetailsModal";
import CancelPendingModal from "../AllModals/CancelPendingModal/CancelPendingModal";
import AdminDisputeModal from "../AllModals/AdminDisputeModal/AdminDisputeModal";
import ChatBox from "../ChatBox/ChatBox";

const MyBookings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loginusers"));
  const userName = user ? user.fullName : "User";

  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isDisputeModal, setIsDisputeModal] = useState(false);

  useEffect(() => {
    document.title = "Trusty Taskers - My Bookings";
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginusers"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let response = await fetch(
          `http://localhost:5001/api/bookings/myBookedService?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let result = await response.json();
        // console.log(result.success);
        if (result.success) {
          setBookings(result.success);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleCancelRequest = async (bookingId) => {
    if (bookingId) {
      try {
        let update = await fetch(
          `http://localhost:5001/api/bookings/handleBookingRequest`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentStatus: "Cancelled",
              userId,
              bookingId,
            }),
          }
        );

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
    setShowModal(true);
    setIsDisputeModal(booking.currentStatus === "Dispute" || booking.currentStatus === "Refund");
    // setIsDisputeModal(booking.currentStatus === "Refund");
  };

  const closeDetails = () => {
    setSelectedBooking(null);
    setShowModal(false);
    setIsDisputeModal(false);
  };

  const handleUpdateBookingRequest = (booking) => {
    navigate("/reschedulebooking", { state: { booking } });
  };

  const handleVerifyRequest = async (bookingId, currentStatus) => {
    if (bookingId) {
      try {
        let update = await fetch(
          `http://localhost:5001/api/bookings/handleBookingRequest`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bookingId,
              currentStatus,
              userId,
            }),
          }
        );

        let result = await update.json();
        if (result.success) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    }
  };

  const handleReviewsClick = (booking) => {
    navigate("/reviews", {
      state: { booking, categoryFilter: booking.category },
    });
  };

  const handleCancelConfirm = () => {
    if (selectedBooking && selectedBooking._id) {
      handleCancelRequest(selectedBooking._id);
    }
    setShowCancelModal(false);
  };

  const sortedBookings = bookings.sort((a, b) => {
    const statusOrder = {
      Pending: 1,
      Confirmed: 2,
      "Pending Complete": 3,
      Completed: 4,
      Cancelled: 5,
      Dispute: 6,
      Refund: 7
    };

    return statusOrder[a.currentStatus] - statusOrder[b.currentStatus];
  });

  return (
    <>
      <Navbar />
      <h1 className={styles.mainHeading}>{userName}'s BOOKINGS</h1>
      <div className={styles.bookingsContainer}>
        <table className={styles.bookingsTable}>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeader}>Service</th>
              <th className={styles.tableHeader}>Provider</th>
              <th className={styles.tableHeader}>Status</th>
              <th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.length > 0 ? (
              <>
                {/* Pending Bookings */}
                {sortedBookings.filter(
                  (booking) => booking.currentStatus === "Pending"
                ).length > 0 && (
                  <>
                    <tr className={styles.tableRow}>
                      <th colSpan="4" className={styles.groupHeading}>
                        Pending Bookings
                      </th>
                    </tr>
                    {sortedBookings
                      .filter((booking) => booking.currentStatus === "Pending")
                      .map((booking) => (
                        <tr key={booking._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            {booking.category}
                          </td>
                          <td className={styles.tableCell}>
                            {booking.serviceProviderName}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                styles[booking.currentStatus.toLowerCase()]
                              }`}
                            >
                              {booking.currentStatus}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              onClick={() => viewDetails(booking)}
                              className={styles.actionButton}
                            >
                              View Details
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateBookingRequest(booking)
                              }
                              className={styles.actionButton}
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() =>
                                setSelectedBooking(booking) ||
                                setShowCancelModal(true) ||
                                handleCancelRequest(booking._id)
                              }
                              className={styles.actionButton}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}

                {/* Confirmed Bookings */}
                {sortedBookings.filter(
                  (booking) => booking.currentStatus === "Confirmed"
                ).length > 0 && (
                  <>
                    <tr className={styles.tableRow}>
                      <th colSpan="4" className={styles.groupHeading}>
                        Confirmed Bookings
                      </th>
                    </tr>
                    {sortedBookings
                      .filter(
                        (booking) => booking.currentStatus === "Confirmed"
                      )
                      .map((booking) => (
                        <tr key={booking._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            {booking.category}
                          </td>
                          <td className={styles.tableCell}>
                            {booking.serviceProviderName}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                styles[booking.currentStatus.toLowerCase()]
                              }`}
                            >
                              {booking.currentStatus}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              onClick={() => viewDetails(booking)}
                              className={styles.actionButton}
                            >
                              View Details
                            </button>
                            <button
                              onClick={() =>
                                handleVerifyRequest(booking._id, "Completed")
                              }
                              className={styles.actionButton}
                            >
                              Complete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}

                {/* Pending Complete Bookings */}
                {sortedBookings.filter(
                  (booking) => booking.currentStatus === "Pending Complete"
                ).length > 0 && (
                  <>
                    <tr className={styles.tableRow}>
                      <th colSpan="4" className={styles.groupHeading}>
                        Confirmation Pending
                      </th>
                    </tr>
                    {sortedBookings
                      .filter(
                        (booking) =>
                          booking.currentStatus === "Pending Complete"
                      )
                      .map((booking) => (
                        <tr key={booking._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            {booking.category}
                          </td>
                          <td className={styles.tableCell}>
                            {booking.serviceProviderName}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                styles.pendingConfirmation
                              } ${styles[booking.currentStatus.toLowerCase()]}`}
                            >
                              Confirmation Pending
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              onClick={() => viewDetails(booking)}
                              className={styles.actionButton}
                            >
                              View Details
                            </button>
                            {booking.userStatus === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleVerifyRequest(
                                      booking._id,
                                      "Completed"
                                    )
                                  }
                                  className={styles.actionButton}
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() =>
                                    handleVerifyRequest(booking._id, "Dispute")
                                  }
                                  className={styles.actionButton}
                                >
                                  Dispute
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                  </>
                )}

                {/* Completed Bookings */}
                {sortedBookings.filter(
                  (booking) => booking.currentStatus === "Completed"
                ).length > 0 && (
                  <>
                    <tr className={styles.tableRow}>
                      <th colSpan="4" className={styles.groupHeading}>
                        Completed Bookings
                      </th>
                    </tr>
                    {sortedBookings
                      .filter(
                        (booking) => booking.currentStatus === "Completed"
                      )
                      .map((booking) => (
                        <tr key={booking._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            {booking.category}
                          </td>
                          <td className={styles.tableCell}>
                            {booking.serviceProviderName}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                styles[booking.currentStatus.toLowerCase()]
                              }`}
                            >
                              {booking.currentStatus}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              onClick={() => viewDetails(booking)}
                              className={styles.actionButton}
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleReviewsClick(booking)}
                              className={styles.actionButton}
                            >
                              Reviews
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}

                {/* Cancelled Bookings */}
                {sortedBookings.filter(
                  (booking) => booking.currentStatus === "Cancelled"
                ).length > 0 && (
                  <>
                    <tr className={styles.tableRow}>
                      <th colSpan="4" className={styles.groupHeading}>
                        Cancelled Bookings
                      </th>
                    </tr>
                    {sortedBookings
                      .filter(
                        (booking) => booking.currentStatus === "Cancelled"
                      )
                      .map((booking) => (
                        <tr key={booking._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            {booking.category}
                          </td>
                          <td className={styles.tableCell}>
                            {booking.serviceProviderName}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                styles[booking.currentStatus.toLowerCase()]
                              }`}
                            >
                              {booking.currentStatus}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              onClick={() => viewDetails(booking)}
                              className={styles.actionButton}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}

                {/* Disputed Bookings */}
                {sortedBookings.filter(
                  (booking) => booking.currentStatus === "Dispute"
                ).length > 0 && (
                  <>
                    <tr className={styles.tableRow}>
                      <th colSpan="4" className={styles.groupHeading}>
                        Dispute Bookings
                      </th>
                    </tr>
                    {sortedBookings
                      .filter((booking) => booking.currentStatus === "Dispute")
                      .map((booking) => (
                        <tr key={booking._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            {booking.category}
                          </td>
                          <td className={styles.tableCell}>
                            {booking.serviceProviderName}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                styles[booking.currentStatus.toLowerCase()]
                              }`}
                            >
                              {booking.currentStatus}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              onClick={() => viewDetails(booking)}
                              className={styles.actionButton}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}

                {/* Refunded Bookings */}
                {sortedBookings.filter(
                  (booking) => booking.currentStatus === "Refund"
                ).length > 0 && (
                  <>
                    <tr className={styles.tableRow}>
                      <th colSpan="4" className={styles.groupHeading}>
                        Refunded Bookings
                      </th>
                    </tr>
                    {sortedBookings
                      .filter(
                        (booking) => booking.currentStatus === "Refund"
                      )
                      .map((booking) => (
                        <tr key={booking._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>
                            {booking.category}
                          </td>
                          <td className={styles.tableCell}>
                            {booking.serviceProviderName}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                styles[booking.currentStatus.toLowerCase()]
                              }`}
                            >
                              {booking.currentStatus}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <button
                              onClick={() => viewDetails(booking)}
                              className={styles.actionButton}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </>
            ) : (
              <tr className={styles.tableRow}>
                <td colSpan="4" className={styles.noBookings}>
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && selectedBooking && !isDisputeModal && (
        <BookingDetailsModal booking={selectedBooking} onClose={closeDetails} />
      )}
      {showCancelModal && selectedBooking && (
        <CancelPendingModal
          onCancel={handleCancelConfirm}
          onClose={() => setShowCancelModal(false)}
        />
      )}
      {showModal && selectedBooking && isDisputeModal && (
        <AdminDisputeModal booking={selectedBooking} onClose={closeDetails} />
      )}
      <ChatBox />
    </>
  );
};

export default MyBookings;
