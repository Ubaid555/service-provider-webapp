// import React, { useState, useEffect } from 'react';
// import styles from './ManageRequests.module.css';
// import Navbar from '../Navbar/Navbar';
// import CancelPendingModal from '../AllModals/CancelPendingModal/CancelPendingModal';
// import PendingDetailsModal from '../AllModals/PendingDetailsModal/PendingDetailsModal';
// import RequestConfirmModal from '../AllModals/RequestConfirmModal/RequestConfirmModal';
// import Dashboard from '../Dashboard/Dashboard';
// import ChatBox from '../ChatBox/ChatBox';

// const ManageRequests = () => {
//     const user = JSON.parse(localStorage.getItem("loginusers"));
//     const userName = user ? user.fullName : "User";

//     const [userId, setUserId] = useState("");
//     const [bookings, setBookings] = useState([]);
//     const [selectedBooking, setSelectedBooking] = useState(null); // State to manage selected booking
//     const [showModal, setShowModal] = useState(false); // State to manage details modal visibility
//     const [showConfirmModal, setShowConfirmModal] = useState(false); // State to manage confirm modal visibility
//     const [bookingToConfirm, setBookingToConfirm] = useState(null); // State to manage booking to be confirmed
//     const [showCancelModal, setShowCancelModal] = useState(false); // State to manage cancel modal visibility

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("loginusers"));
//         if (storedUser && storedUser._id) {
//             setUserId(storedUser._id);
//             console.log(userId);
//         }
//     }, [userId]);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 let response = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=Pending`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 let result = await response.json();
//                 console.log(result);
//                 if(result.success){
//                 setBookings(result.success);}
//             } catch (error) {
//                 console.error("Error fetching bookings:", error);
//             }
//         };

//         if (userId) {
//             fetchBookings();
//         }
//     }, [userId]);

//     const handleAcceptRequest = async (bookingId) => {
//         if (bookingId) {
//             try {
//                 console.log(bookingId);
//                 let update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ bookingId,currentStatus: 'Confirmed',userId })
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
//                     body: JSON.stringify({ currentStatus: status,userId,bookingId })
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
//         setShowModal(true); // Show the modal when viewing details
//     };

//     const closeDetails = () => {
//         setSelectedBooking(null);
//         setShowModal(false); // Close the modal
//     };

//     const confirmAcceptRequest = (booking) => {
//         setBookingToConfirm(booking);
//         setShowConfirmModal(true); // Show the confirm modal
//     };

//     const handleConfirm = () => {
//         if (bookingToConfirm) {
//             handleAcceptRequest(bookingToConfirm._id);
//         }
//         setShowConfirmModal(false); // Close the confirm modal
//     };

//     const handleCancel = () => {
//         setBookingToConfirm(null);
//         setShowConfirmModal(false); // Close the confirm modal
//     };

//     const handleRejectWithConfirmation = (bookingId) => {
//         setBookingToConfirm(bookingId);
//         setShowCancelModal(true); // Show the cancel modal
//     };

//     const handleCancelConfirm = () => {
//         if (bookingToConfirm) {
//             handleRejectRequest(bookingToConfirm, "Cancelled");
//         }
//         setShowCancelModal(false); // Close the cancel modal
//     };

//     const handleCancelCancel = () => {
//         setShowCancelModal(false); // Close the cancel modal
//     };

//     return (
//         <>
//             <Navbar />
//             <Dashboard />
//             <h1 className={styles.main_heading}>{userName}'s PENDING REQUESTS</h1>
//             <div className={styles.bookingsContainer}>
//                 <table className={styles.bookingsTable}>
//                     <thead>
//                         <tr className={styles.tableRow}>
//                             <th className={styles.tableHeader}>Service Name</th>
//                             <th className={styles.tableHeader}>Requester Name</th>
//                             <th className={styles.tableHeader}>Status</th>
//                             <th className={styles.tableHeader}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.length > 0 ? (
//                             bookings.map((booking) => (
//                                 <tr key={booking._id} className={styles.tableRow}>
//                                     <td className={styles.tableCell}>{booking.category}</td>
//                                     <td className={styles.tableCell}>{booking.serviceTakerName}</td>
//                                     <td className={styles.tableCell}>
//                                         <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
//                                             {booking.currentStatus}
//                                         </span>
//                                     </td>
//                                     <td className={styles.tableCell}>
//                                         <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                         <button className={styles.actionButton} onClick={() => confirmAcceptRequest(booking)}>Accept</button>
//                                         <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr className={styles.tableRow}>
//                                 <td colSpan="4" className={styles.noBookings}>No bookings found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <ChatBox/>
//             {showModal && (
//                 <PendingDetailsModal booking={selectedBooking} onClose={closeDetails} />
//             )}
//             {showConfirmModal && (
//                 <RequestConfirmModal
//                     show={showConfirmModal}
//                     onConfirm={handleConfirm}
//                     onCancel={handleCancel}
//                 />
//             )}
//             {showCancelModal && (
//                 <CancelPendingModal
//                     show={showCancelModal}
//                     onConfirm={handleCancelConfirm}
//                     onCancel={handleCancelCancel}
//                 />
//             )}
//         </>
//     );
// };

// export default ManageRequests;







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
//     const [bookings, setBookings] = useState([]);
//     const [selectedBooking, setSelectedBooking] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [bookingToConfirm, setBookingToConfirm] = useState(null);
//     const [showCancelModal, setShowCancelModal] = useState(false);
//     const [showCompleteModal, setShowCompleteModal] = useState(false);
//     const [bookingToComplete, setBookingToComplete] = useState(null);

//     useEffect(() => {
//         document.title = "Manage Requests - Trusty Taskers";
//     }, []);

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("loginusers"));
//         if (storedUser && storedUser._id) {
//             setUserId(storedUser._id);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const responsePending = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=Pending`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 const resultPending = await responsePending.json();
//                 if (resultPending.success) {
//                     setBookings(prevBookings => [...prevBookings, ...resultPending.success]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching pending bookings:", error);
//             }

//             try {
//                 const responseConfirmed = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=Confirmed`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 const resultConfirmed = await responseConfirmed.json();
//                 if (resultConfirmed.success) {
//                     setBookings(prevBookings => [...prevBookings, ...resultConfirmed.success]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching confirmed bookings:", error);
//             }

//             try {
//                 const responseCompleted = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=Completed`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 const resultCompleted = await responseCompleted.json();
//                 if (resultCompleted.success) {
//                     setBookings(prevBookings => [...prevBookings, ...resultCompleted.success]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching completed bookings:", error);
//             }

//             try {
//                 const responseCancelled = await fetch(`http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=Cancelled`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 const resultCancelled = await responseCancelled.json();
//                 if (resultCancelled.success) {
//                     setBookings(prevBookings => [...prevBookings, ...resultCancelled.success]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching cancelled bookings:", error);
//             }
//         };

//         if (userId) {
//             fetchBookings();
//         }
//     }, [userId]);

//     const handleAcceptRequest = async (bookingId) => {
//         if (bookingId) {
//             try {
//                 const update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ bookingId, currentStatus: 'Confirmed', userId })
//                 });

//                 const result = await update.json();
//                 if (result.success) {
//                     setBookings(bookings.map(booking =>
//                         booking._id === bookingId ? { ...booking, currentStatus: 'Confirmed' } : booking
//                     ));
//                 }
//             } catch (error) {
//                 console.error("Error updating booking status:", error);
//             }
//         }
//     };

//     const handleRejectRequest = async (bookingId, status) => {
//         if (bookingId && status) {
//             try {
//                 const update = await fetch(`http://localhost:5001/api/bookings/handleBookingRequest`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ currentStatus: status, userId, bookingId })
//                 });

//                 const result = await update.json();
//                 if (result.success) {
//                     setBookings(bookings.map(booking =>
//                         booking._id === bookingId ? { ...booking, currentStatus: status } : booking
//                     ));
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

//     const confirmCompleteRequest = (booking) => {
//         setBookingToComplete(booking);
//         setShowCompleteModal(true);
//     };

//     const handleComplete = () => {
//         if (bookingToComplete) {
//             handleRejectRequest(bookingToComplete._id, "Completed");
//         }
//         setShowCompleteModal(false);
//     };

//     const handleCompleteCancel = () => {
//         setBookingToComplete(null);
//         setShowCompleteModal(false);
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

//     const renderBookingRows = (status) => {
//         return bookings
//             .filter(booking => booking.currentStatus === status)
//             .map((booking) => (
//                 <tr key={booking._id} className={styles.tableRow}>
//                     <td className={styles.tableCell}>{booking.category}</td>
//                     <td className={styles.tableCell}>{booking.serviceTakerName}</td>
//                     <td className={styles.tableCell}>
//                         <span className={`${styles.statusBadge} ${styles[booking.currentStatus.toLowerCase()]}`}>
//                             {booking.currentStatus}
//                         </span>
//                     </td>
//                     <td className={styles.tableCell}>
//                         {booking.currentStatus === 'Pending' && (
//                             <>
//                                 <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                 <button className={styles.actionButton} onClick={() => confirmAcceptRequest(booking)}>Accept</button>
//                                 <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
//                             </>
//                         )}
//                         {booking.currentStatus === 'Confirmed' && (
//                             <>
//                                 <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                                 <button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button>
//                                 <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button>
//                             </>
//                         )}
//                         {booking.currentStatus === 'Completed' && (
//                             <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                         )}
//                         {booking.currentStatus === 'Cancelled' && (
//                             <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
//                         )}
//                     </td>
//                 </tr>
//             ));
//     };

//     return (
//         <>
//             <Navbar />
//             <Dashboard />
//             <ChatBox />
//             <h1 className={styles.main_heading}>{userName}'s Requests</h1>
//             <div className={styles.bookingsContainer}>
//                 <table className={styles.bookingsTable}>
//                     <thead>
//                         <tr className={styles.tableRow}>
//                             <th className={styles.tableHeader}>Service Name</th>
//                             <th className={styles.tableHeader}>Requester Name</th>
//                             <th className={styles.tableHeader}>Status</th>
//                             <th className={styles.tableHeader}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {renderBookingRows('Pending').length > 0 && (
//                             <>
//                                 <tr className={styles.statusRow}>
//                                     <td colSpan="4" className={styles.statusHeader}><b>PENDING</b></td>
//                                 </tr>
//                                 {renderBookingRows('Pending')}
//                             </>
//                         )}
//                         {renderBookingRows('Confirmed').length > 0 && (
//                             <>
//                                 <tr className={styles.statusRow}>
//                                     <td colSpan="4" className={styles.statusHeader}><b>CONFIRMED</b></td>
//                                 </tr>
//                                 {renderBookingRows('Confirmed')}
//                             </>
//                         )}
//                         {renderBookingRows('Completed').length > 0 && (
//                             <>
//                                 <tr className={styles.statusRow}>
//                                     <td colSpan="4" className={styles.statusHeader}><b>COMPLETED</b></td>
//                                 </tr>
//                                 {renderBookingRows('Completed')}
//                             </>
//                         )}
//                         {renderBookingRows('Cancelled').length > 0 && (
//                             <>
//                                 <tr className={styles.statusRow}>
//                                     <td colSpan="4" className={styles.statusHeader}><b>CANCELLED</b></td>
//                                 </tr>
//                                 {renderBookingRows('Cancelled')}
//                             </>
//                         )}
//                         {bookings.length === 0 && (
//                             <tr className={styles.tableRow}>
//                                 <td colSpan="4" className={styles.noBookings}>No requests found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             {showModal && (
//                 <PendingDetailsModal booking={selectedBooking} onClose={closeDetails} />
//             )}
//             {showConfirmModal && (
//                 <RequestConfirmModal
//                     show={showConfirmModal}
//                     booking={bookingToConfirm}
//                     onConfirm={handleConfirm}
//                     onCancel={handleCancel}
//                 />
//             )}
//             {showCancelModal && (
//                 <CancelPendingModal
//                     show={showCancelModal}
//                     bookingId={bookingToConfirm}
//                     onConfirm={handleCancelConfirm}
//                     onCancel={handleCancelCancel}
//                 />
//             )}
//             {showCompleteModal && (
//                 <CompleteBookingModal
//                     show={showCompleteModal}
//                     booking={bookingToComplete}
//                     onConfirm={handleComplete}
//                     onCancel={handleCompleteCancel}
//                 />
//             )}
//         </>
//     );
// };

// export default ManageRequests;


import React, { useState, useEffect } from 'react';
import styles from './ManageRequests.module.css';
import Navbar from '../Navbar/Navbar';
import CancelPendingModal from '../AllModals/CancelPendingModal/CancelPendingModal';
import PendingDetailsModal from '../AllModals/PendingDetailsModal/PendingDetailsModal';
import RequestConfirmModal from '../AllModals/RequestConfirmModal/RequestConfirmModal';
import CompleteBookingModal from '../AllModals/CompleteBookingModal/CompleteBookingModal';
import Dashboard from '../Dashboard/Dashboard';
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
            fetchBookings('Verified', setVerifiedBookings); // Fetch verified bookings
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
                    body: JSON.stringify({ bookingId, currentStatus: 'Verified', userId })
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
    <Dashboard />
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
                            <th colSpan="4" className={styles.groupHeading}>Verified Bookings</th>
                        </tr>
                        {verifiedBookings.map((booking) => (
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
                                    <button className={styles.actionButton} onClick={() => confirmCompleteRequest(booking)}>Complete</button>
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