import React, { useState, useEffect } from 'react';
import styles from './ManageRequests.module.css';
import Navbar from '../Navbar/Navbar';
import CancelPendingModal from '../AllModals/CancelPendingModal/CancelPendingModal';
import PendingDetailsModal from '../AllModals/PendingDetailsModal/PendingDetailsModal';
import RequestConfirmModal from '../AllModals/RequestConfirmModal/RequestConfirmModal';
import CompleteBookingModal from '../AllModals/CompleteBookingModal/CompleteBookingModal';
import ChatBox from '../ChatBox/ChatBox';

const ManageRequests = () => {
    const user = JSON.parse(localStorage.getItem("loginusers"));
    const userName = user ? user.fullName : "User";

    const [userId, setUserId] = useState("");
    const [pendingBookings, setPendingBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [verifiedBookings, setVerifiedBookings] = useState([]); // New state for verified bookings
    const [completedBookings, setCompletedBookings] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [bookingToConfirm, setBookingToConfirm] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

    useEffect(() => {
        document.title = 'Trusty Taskers - Service Requests';
      }, []);
    

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loginusers"));
        if (storedUser && storedUser._id) {
            setUserId(storedUser._id);
        }
    }, []);

    useEffect(() => {
        const fetchBookings = async (status, setBookings) => {
            try {
                let response = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=${status}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                let result = await response.json();
                if (result.success) {
                    setBookings(result.success);
                }
            } catch (error) {
                console.error(`Error fetching ${status.toLowerCase()} bookings:`, error);
            }
        };

        if (userId) {
            fetchBookings('Pending', setPendingBookings);
            fetchBookings('Confirmed', setConfirmedBookings);
            fetchBookings('Pending Complete', setVerifiedBookings); // Fetch verified bookings
            fetchBookings('Completed', setCompletedBookings);
            fetchBookings('Cancelled', setCancelledBookings);
        }
    }, [userId]);

    const handleAcceptRequest = async (bookingId) => {
        if (bookingId) {
            try {
                let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ bookingId, currentStatus: 'Confirmed', userId })
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

    const handleVerifyRequest = async (bookingId) => {
        if (bookingId) {
            try {
                let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ bookingId, currentStatus: 'Completed', userId })
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

    const handleRejectRequest = async (bookingId, status) => {
        if (bookingId && status) {
            try {
                let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ currentStatus: status, userId, bookingId })
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
        setShowModal(true);
    };

    const closeDetails = () => {
        setSelectedBooking(null);
        setShowModal(false);
    };

    const confirmAcceptRequest = (booking) => {
        setBookingToConfirm(booking);
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        if (bookingToConfirm) {
            handleAcceptRequest(bookingToConfirm._id);
        }
        setShowConfirmModal(false);
    };

    const handleCancel = () => {
        setBookingToConfirm(null);
        setShowConfirmModal(false);
    };

    const handleRejectWithConfirmation = (bookingId) => {
        setBookingToConfirm(bookingId);
        setShowCancelModal(true);
    };

    const handleCancelConfirm = () => {
        if (bookingToConfirm) {
            handleRejectRequest(bookingToConfirm, "Cancelled");
        }
        setShowCancelModal(false);
    };

    const handleCancelCancel = () => {
        setShowCancelModal(false);
    };

    const confirmCompleteRequest = (booking) => {
        setBookingToConfirm(booking);
        setShowCompleteModal(true);
    };

    const handleCompleteConfirm = () => {
        if (bookingToConfirm) {
            handleRejectRequest(bookingToConfirm._id, "Completed");
        }
        setShowCompleteModal(false);
    };

    const handleCompleteCancel = () => {
        setBookingToConfirm(null);
        setShowCompleteModal(false);
    };

    return (
        <>
    <Navbar />
    <h1 className={styles.main_heading}>{userName}'s Requests</h1>
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
                {/* Pending Bookings */}
                {pendingBookings.length > 0 && (
                    <>
                        <tr className={styles.tableRow}>
                            <th colSpan="4" className={styles.groupHeading}>Pending Bookings</th>
                        </tr>
                        {pendingBookings.map((booking) => (
                            <tr key={booking._id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{booking.category}</td>
                                <td className={styles.tableCell}>{booking.serviceTakerName}</td>
                                <td className={styles.tableCell}>
                                    <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
                                        {booking.currentStatus}
                                    </span>
                                </td>
                                <td className={styles.tableCell}>
                                    <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
                                    <button className={styles.actionButton} onClick={() => confirmAcceptRequest(booking)}>Accept</button>
                                    <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </>
                )}

                {/* Confirmed Bookings */}
                {confirmedBookings.length > 0 && (
                    <>
                        <tr className={styles.tableRow}>
                            <th colSpan="4" className={styles.groupHeading}>Confirmed Bookings</th>
                        </tr>
                        {confirmedBookings.map((booking) => (
                            <tr key={booking._id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{booking.category}</td>
                                <td className={styles.tableCell}>{booking.serviceTakerName}</td>
                                <td className={styles.tableCell}>
                                    <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
                                        {booking.currentStatus}
                                    </span>
                                </td>
                                <td className={styles.tableCell}>
                                    <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
                                    <button className={styles.actionButton} onClick={() => handleVerifyRequest(booking._id)}>Complete</button>
                                    {/* <button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button> */}
                                    <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </>
                )}

                {/* Verified Bookings */}
                {verifiedBookings.length > 0 && (
                    <>
                        <tr className={styles.tableRow}>
                            <th colSpan="4" className={styles.groupHeading}>Confirmation Pending</th>
                        </tr>
                        {verifiedBookings.map((booking) => (
                            <tr key={booking._id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{booking.category}</td>
                                <td className={styles.tableCell}>{booking.serviceTakerName}</td>
                                <td className={styles.tableCell}>
                                    <span className={`${styles.statusBadge} ${styles.pendingConfirmation} ${styles[booking.currentStatus.toLowerCase()]}`}>
                                        {/* {booking.currentStatus} */}
                                        Confirmation Pending
                                    </span>
                                </td>
                                <td className={styles.tableCell}>
                                    <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
                                   {booking.serviceProviderStatus === "Pending" ? (<button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button>) : (<></>)}
                                    {/* <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button> */}
                                </td>
                            </tr>
                        ))}
                    </>
                )}

                {/* Completed Bookings */}
                {completedBookings.length > 0 && (
                    <>
                        <tr className={styles.tableRow}>
                            <th colSpan="4" className={styles.groupHeading}>Completed Bookings</th>
                        </tr>
                        {completedBookings.map((booking) => (
                            <tr key={booking._id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{booking.category}</td>
                                <td className={styles.tableCell}>{booking.serviceTakerName}</td>
                                <td className={styles.tableCell}>
                                    <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
                                        {booking.currentStatus}
                                    </span>
                                </td>
                                <td className={styles.tableCell}>
                                    <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </>
                )}

                {/* Cancelled Bookings */}
                {cancelledBookings.length > 0 && (
                    <>
                        <tr className={styles.tableRow}>
                            <th colSpan="4" className={styles.groupHeading}>Cancelled Bookings</th>
                        </tr>
                        {cancelledBookings.map((booking) => (
                            <tr key={booking._id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{booking.category}</td>
                                <td className={styles.tableCell}>{booking.serviceTakerName}</td>
                                <td className={styles.tableCell}>
                                    <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
                                        {booking.currentStatus}
                                    </span>
                                </td>
                                <td className={styles.tableCell}>
                                    <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </>
                )}

                {/* No bookings found */}
                {pendingBookings.length === 0 &&
                    confirmedBookings.length === 0 &&
                    verifiedBookings.length === 0 &&
                    completedBookings.length === 0 &&
                    cancelledBookings.length === 0 && (
                        <tr className={styles.tableRow}>
                            <td colSpan="4" className={styles.noBookings}>No bookings found</td>
                        </tr>
                    )}
            </tbody>
        </table>
    </div>
    <ChatBox />

    {showModal && (
        <PendingDetailsModal booking={selectedBooking} onClose={closeDetails} />
    )}
    {showConfirmModal && (
        <RequestConfirmModal
            show={showConfirmModal}
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
    {showCompleteModal && (
        <CompleteBookingModal
            show={showCompleteModal}
            onConfirm={handleCompleteConfirm}
            onCancel={handleCompleteCancel}
        />
    )}
</>

    );
    
};

export default ManageRequests;

// import React, { useState, useEffect } from 'react';
// import styles from './ManageRequests.module.css';
// import Navbar from '../Navbar/Navbar';
// import CancelPendingModal from '../AllModals/CancelPendingModal/CancelPendingModal';
// import PendingDetailsModal from '../AllModals/PendingDetailsModal/PendingDetailsModal';
// import RequestConfirmModal from '../AllModals/RequestConfirmModal/RequestConfirmModal';
// import CompleteBookingModal from '../AllModals/CompleteBookingModal/CompleteBookingModal';
// import Dashboard from '../Dashboard/Dashboard';
// import ChatBox from '../ChatBox/ChatBox';

// const ManageRequests = () => {
//     const user = JSON.parse(localStorage.getItem("loginusers"));
//     const userName = user ? user.fullName : "User";

//     const [userId, setUserId] = useState("");
//     const [pendingBookings, setPendingBookings] = useState([]);
//     const [confirmedBookings, setConfirmedBookings] = useState([]);
//     const [verifiedBookings, setVerifiedBookings] = useState([]); // New state for verified bookings
//     const [completedBookings, setCompletedBookings] = useState([]);
//     const [cancelledBookings, setCancelledBookings] = useState([]);
//     const [selectedBooking, setSelectedBooking] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [bookingToConfirm, setBookingToConfirm] = useState(null);
//     const [showCancelModal, setShowCancelModal] = useState(false);
//     const [showCompleteModal, setShowCompleteModal] = useState(false);

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("loginusers"));
//         if (storedUser && storedUser._id) {
//             setUserId(storedUser._id);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchBookings = async (status, setBookings) => {
//             try {
//                 let response = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=${status}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 let result = await response.json();
//                 if (result.success) {
//                     setBookings(result.success);
//                 }
//             } catch (error) {
//                 console.error(`Error fetching ${status.toLowerCase()} bookings:`, error);
//             }
//         };

//         if (userId) {
//             fetchBookings('Pending', setPendingBookings);
//             fetchBookings('Confirmed', setConfirmedBookings);
//             fetchBookings('Pending Complete', setVerifiedBookings); // Fetch verified bookings
//             fetchBookings('Completed', setCompletedBookings);
//             fetchBookings('Cancelled', setCancelledBookings);
//         }
//     }, [userId]);

//     const handleAcceptRequest = async (bookingId) => {
//         if (bookingId) {
//             try {
//                 let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ bookingId, currentStatus: 'Confirmed', userId })
//                 });

//                 let result = await update.json();
//                 if (result.success) {
//                     window.location.reload();
//                 }
//             } catch (error) {
//                 console.error("Error updating booking status:", error);
//             }
//         }
//     };

//     const handleVerifyRequest = async (bookingId) => {
//         if (bookingId) {
//             try {
//                 let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ bookingId, currentStatus: 'Completed', userId })
//                 });

//                 let result = await update.json();
//                 if (result.success) {
//                     window.location.reload();
//                 }
//             } catch (error) {
//                 console.error("Error updating booking status:", error);
//             }
//         }
//     };

//     const handleRejectRequest = async (bookingId, status) => {
//         if (bookingId && status) {
//             try {
//                 let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ currentStatus: status, userId, bookingId })
//                 });

//                 let result = await update.json();
//                 if (result.success) {
//                     window.location.reload();
//                 }
//             } catch (error) {
//                 console.error("Error updating booking status:", error);
//             }
//         }
//     };

//     const viewDetails = (booking) => {
//         setSelectedBooking(booking);
//         setShowModal(true);
//     };

//     const closeDetails = () => {
//         setSelectedBooking(null);
//         setShowModal(false);
//     };

//     const confirmAcceptRequest = (booking) => {
//         setBookingToConfirm(booking);
//         setShowConfirmModal(true);
//     };

//     const handleConfirm = () => {
//         if (bookingToConfirm) {
//             handleAcceptRequest(bookingToConfirm._id);
//         }
//         setShowConfirmModal(false);
//     };

//     const handleCancel = () => {
//         setBookingToConfirm(null);
//         setShowConfirmModal(false);
//     };

//     const handleRejectWithConfirmation = (bookingId) => {
//         setBookingToConfirm(bookingId);
//         setShowCancelModal(true);
//     };

//     const handleCancelConfirm = () => {
//         if (bookingToConfirm) {
//             handleRejectRequest(bookingToConfirm, "Cancelled");
//         }
//         setShowCancelModal(false);
//     };

//     const handleCancelCancel = () => {
//         setShowCancelModal(false);
//     };

//     const confirmCompleteRequest = (booking) => {
//         setBookingToConfirm(booking);
//         setShowCompleteModal(true);
//     };

//     const handleCompleteConfirm = () => {
//         if (bookingToConfirm) {
//             handleRejectRequest(bookingToConfirm._id, "Completed");
//         }
//         setShowCompleteModal(false);
//     };

//     const handleCompleteCancel = () => {
//         setBookingToConfirm(null);
//         setShowCompleteModal(false);
//     };

//     return (
//         <>
//     <Navbar />
//     <Dashboard />
//     <h1 className={styles.main_heading}>{userName}'s Requests</h1>
//     <div className={styles.bookingsContainer}>
//         <table className={styles.bookingsTable}>
//             <thead>
//                 <tr className={styles.tableRow}>
//                     <th className={styles.tableHeader}>Service Name</th>
//                     <th className={styles.tableHeader}>Requester Name</th>
//                     <th className={styles.tableHeader}>Status</th>
//                     <th className={styles.tableHeader}>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {/* Pending Bookings */}
//                 {pendingBookings.length > 0 && (
//                     <>
//                         <tr className={styles.tableRow}>
//                             <th colSpan="4" className={styles.groupHeading}>Pending Bookings</th>
//                         </tr>
//                         {pendingBookings.map((booking) => (
//                             <tr key={booking._id} className={styles.tableRow}>
//                                 <td className={styles.tableCell}>{booking.category}</td>
//                                 <td className={styles.tableCell}>{booking.serviceTakerName}</td>
//                                 <td className={styles.tableCell}>
//                                     <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
//                                         {booking.currentStatus}
//                                     </span>
//                                 </td>
//                                 <td className={styles.tableCell}>
//                                     <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                     <button className={styles.actionButton} onClick={() => confirmAcceptRequest(booking)}>Accept</button>
//                                     <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </>
//                 )}

//                 {/* Confirmed Bookings */}
//                 {confirmedBookings.length > 0 && (
//                     <>
//                         <tr className={styles.tableRow}>
//                             <th colSpan="4" className={styles.groupHeading}>Confirmed Bookings</th>
//                         </tr>
//                         {confirmedBookings.map((booking) => (
//                             <tr key={booking._id} className={styles.tableRow}>
//                                 <td className={styles.tableCell}>{booking.category}</td>
//                                 <td className={styles.tableCell}>{booking.serviceTakerName}</td>
//                                 <td className={styles.tableCell}>
//                                     <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
//                                         {booking.currentStatus}
//                                     </span>
//                                 </td>
//                                 <td className={styles.tableCell}>
//                                     <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                     <button className={styles.actionButton} onClick={() => handleVerifyRequest(booking._id)}>Complete</button>
//                                     {/* <button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button> */}
//                                     <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </>
//                 )}

//                 {/* Verified Bookings */}
//                 {verifiedBookings.length > 0 && (
//                     <>
//                         <tr className={styles.tableRow}>
//                             <th colSpan="4" className={styles.groupHeading}>Pending Confirmation</th>
//                         </tr>
//                         {verifiedBookings.map((booking) => (
//                             <tr key={booking._id} className={styles.tableRow}>
//                                 <td className={styles.tableCell}>{booking.category}</td>
//                                 <td className={styles.tableCell}>{booking.serviceTakerName}</td>
//                                 <td className={styles.tableCell}>
//                                     <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
//                                         {/* {booking.currentStatus} */}
//                                         Verify
//                                     </span>
//                                 </td>
//                                 <td className={styles.tableCell}>
//                                     <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                    {booking.serviceProviderStatus === "Pending" ? (<button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button>) : (<></>)}
//                                     {/* <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button> */}
//                                 </td>
//                             </tr>
//                         ))}
//                     </>
//                 )}

//                 {/* Completed Bookings */}
//                 {completedBookings.length > 0 && (
//                     <>
//                         <tr className={styles.tableRow}>
//                             <th colSpan="4" className={styles.groupHeading}>Completed Bookings</th>
//                         </tr>
//                         {completedBookings.map((booking) => (
//                             <tr key={booking._id} className={styles.tableRow}>
//                                 <td className={styles.tableCell}>{booking.category}</td>
//                                 <td className={styles.tableCell}>{booking.serviceTakerName}</td>
//                                 <td className={styles.tableCell}>
//                                     <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
//                                         {booking.currentStatus}
//                                     </span>
//                                 </td>
//                                 <td className={styles.tableCell}>
//                                     <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </>
//                 )}

//                 {/* Cancelled Bookings */}
//                 {cancelledBookings.length > 0 && (
//                     <>
//                         <tr className={styles.tableRow}>
//                             <th colSpan="4" className={styles.groupHeading}>Cancelled Bookings</th>
//                         </tr>
//                         {cancelledBookings.map((booking) => (
//                             <tr key={booking._id} className={styles.tableRow}>
//                                 <td className={styles.tableCell}>{booking.category}</td>
//                                 <td className={styles.tableCell}>{booking.serviceTakerName}</td>
//                                 <td className={styles.tableCell}>
//                                     <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
//                                         {booking.currentStatus}
//                                     </span>
//                                 </td>
//                                 <td className={styles.tableCell}>
//                                     <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </>
//                 )}

//                 {/* No bookings found */}
//                 {pendingBookings.length === 0 &&
//                     confirmedBookings.length === 0 &&
//                     verifiedBookings.length === 0 &&
//                     completedBookings.length === 0 &&
//                     cancelledBookings.length === 0 && (
//                         <tr className={styles.tableRow}>
//                             <td colSpan="4" className={styles.noBookings}>No bookings found</td>
//                         </tr>
//                     )}
//             </tbody>
//         </table>
//     </div>
//     <ChatBox />

//     {showModal && (
//         <PendingDetailsModal booking={selectedBooking} onClose={closeDetails} />
//     )}
//     {showConfirmModal && (
//         <RequestConfirmModal
//             show={showConfirmModal}
//             onConfirm={handleConfirm}
//             onCancel={handleCancel}
//         />
//     )}
//     {showCancelModal && (
//         <CancelPendingModal
//             show={showCancelModal}
//             onConfirm={handleCancelConfirm}
//             onCancel={handleCancelCancel}
//         />
//     )}
//     {showCompleteModal && (
//         <CompleteBookingModal
//             show={showCompleteModal}
//             onConfirm={handleCompleteConfirm}
//             onCancel={handleCompleteCancel}
//         />
//     )}
// </>

//     );
    
// };

// export default ManageRequests;