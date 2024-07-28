// import React, { useState, useEffect } from "react";
// import styles from "./ManageRequests.module.css";
// import Navbar from "../Navbar/Navbar";
// import CancelPendingModal from "../AllModals/CancelPendingModal/CancelPendingModal";
// import PendingDetailsModaltwo from "../AllModals/PendingDetailsModaltwo/PendingDetailsModaltwo";
// import RequestConfirmModal from "../AllModals/RequestConfirmModal/RequestConfirmModal";
// import CompleteBookingModal from "../AllModals/CompleteBookingModal/CompleteBookingModal";
// import ChatBox from "../ChatBox/ChatBox";

// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../Firebase/firebase";

// const ManageRequests = () => {
//   const user = JSON.parse(localStorage.getItem("loginusers"));
//   const userName = user ? user.fullName : "User";

//   const [userId, setUserId] = useState("");
//   const [pendingBookings, setPendingBookings] = useState([]);
//   const [confirmedBookings, setConfirmedBookings] = useState([]);
//   const [verifiedBookings, setVerifiedBookings] = useState([]);
//   const [completedBookings, setCompletedBookings] = useState([]);
//   const [cancelledBookings, setCancelledBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [bookingToConfirm, setBookingToConfirm] = useState(null);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [showCompleteModal, setShowCompleteModal] = useState(false);
//   const [completionPic,setCompletionPic] = useState("");

//   useEffect(() => {
//     document.title = "Trusty Taskers - Service Requests";
//   }, []);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("loginusers"));
//     if (storedUser && storedUser._id) {
//       setUserId(storedUser._id);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchBookings = async (status, setBookings) => {
//       try {
//         let response = await fetch(
//           `http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=${status}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         let result = await response.json();
//         if (result.success) {
//           setBookings(result.success);
//         }
//       } catch (error) {
//         console.error(
//           `Error fetching ${status.toLowerCase()} bookings:`,
//           error
//         );
//       }
//     };

//     if (userId) {
//       fetchBookings("Pending", setPendingBookings);
//       fetchBookings("Confirmed", setConfirmedBookings);
//       fetchBookings("Pending Complete", setVerifiedBookings); // Fetch verified bookings
//       fetchBookings("Completed", setCompletedBookings);
//       fetchBookings("Cancelled", setCancelledBookings);
//     }
//   }, [userId]);

//   const handleAcceptRequest = async (bookingId) => {
//     if (bookingId) {
//       try {
//         let update = await fetch(
//           `http://localhost:5001/api/bookings/handleBookingRequest`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               bookingId,
//               currentStatus: "Confirmed",
//               userId,
//             }),
//           }
//         );

//         let result = await update.json();
//         if (result.success) {
//           window.location.reload();
//         }
//       } catch (error) {
//         console.error("Error updating booking status:", error);
//       }
//     }
//   };

//   const handleVerifyRequest = async (bookingId) => { 
//     if (bookingId) {
//       try {
//         const imageRef = ref(storage, `images/${completionPic.name}`);
//         await uploadBytes(imageRef, completionPic);
//         const imageURL = await getDownloadURL(imageRef);
//         let update = await fetch(
//           `http://localhost:5001/api/bookings/handleBookingRequest`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               bookingId,
//               currentStatus: "Completed",
//               userId,
//               completionPic:imageURL
//             }),
//           }
//         );

//         let result = await update.json();
//         if (result.success) {
//           window.location.reload();
//         }
//       } catch (error) {
//         console.error("Error updating booking status:", error);
//       }
//     }
//   };

//   const handleRejectRequest = async (bookingId, status) => {
//     if (bookingId && status) {
//       try {
//         let update = await fetch(
//           `http://localhost:5001/api/bookings/handleBookingRequest`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ currentStatus: status, userId, bookingId }),
//           }
//         );

//         let result = await update.json();
//         if (result.success) {
//           window.location.reload();
//         }
//       } catch (error) {
//         console.error("Error updating booking status:", error);
//       }
//     }
//   };

//   const viewDetails = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   const closeDetails = () => {
//     setSelectedBooking(null);
//     setShowModal(false);
//   };

//   const confirmAcceptRequest = (booking) => {
//     setBookingToConfirm(booking);
//     setShowConfirmModal(true);
//   };

//   const handleConfirm = () => {
//     if (bookingToConfirm) {
//       handleAcceptRequest(bookingToConfirm._id);
//     }
//     setShowConfirmModal(false);
//   };

//   const handleCancel = () => {
//     setBookingToConfirm(null);
//     setShowConfirmModal(false);
//   };

//   const handleRejectWithConfirmation = (bookingId) => {
//     setBookingToConfirm(bookingId);
//     setShowCancelModal(true);
//   };

//   const handleCancelConfirm = () => {
//     if (bookingToConfirm) {
//       handleRejectRequest(bookingToConfirm, "Cancelled");
//     }
//     setShowCancelModal(false);
//   };

//   const handleCancelCancel = () => {
//     setShowCancelModal(false);
//   };

//   const confirmCompleteRequest = (booking) => {
//     setBookingToConfirm(booking);
//     setShowCompleteModal(true);
//   };

//   const handleCompleteConfirm = () => {
//     if (bookingToConfirm) {
//       handleRejectRequest(bookingToConfirm._id, "Completed");
//     }
//     setShowCompleteModal(false);
//   };

//   const handleCompleteCancel = () => {
//     setBookingToConfirm(null);
//     setShowCompleteModal(false);
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setCompletionPic(e.target.files[0]);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <h1 className={styles.main_heading}>{userName}'s Requests</h1>
//       <div className={styles.bookingsContainer}>
//         <table className={styles.bookingsTable}>
//           <thead>
//             <tr className={styles.tableRow}>
//               <th className={styles.tableHeader}>Service Name</th>
//               <th className={styles.tableHeader}>Requester Name</th>
//               <th className={styles.tableHeader}>Status</th>
//               <th className={styles.tableHeader}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Pending Bookings */}
//             {pendingBookings.length > 0 && (
//               <>
//                 <tr className={styles.tableRow}>
//                   <th colSpan="4" className={styles.groupHeading}>
//                     Pending Bookings
//                   </th>
//                 </tr>
//                 {pendingBookings.map((booking) => (
//                   <tr key={booking._id} className={styles.tableRow}>
//                     <td className={styles.tableCell}>{booking.category}</td>
//                     <td className={styles.tableCell}>
//                       {booking.serviceTakerName}
//                     </td>
//                     <td className={styles.tableCell}>
//                       <span
//                         className={`${styles.statusBadge} ${
//                           styles[booking.currentStatus.toLowerCase()]
//                         }`}
//                       >
//                         {booking.currentStatus}
//                       </span>
//                     </td>
//                     <td className={styles.tableCell}>
//                       <button
//                         onClick={() => viewDetails(booking)}
//                         className={styles.actionButton}
//                       >
//                         View Details
//                       </button>
//                       <button
//                         className={styles.actionButton}
//                         onClick={() => confirmAcceptRequest(booking)}
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className={styles.actionButton}
//                         onClick={() =>
//                           handleRejectWithConfirmation(booking._id)
//                         }
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}

//             {/* Confirmed Bookings */}
//             {confirmedBookings.length > 0 && (
//               <>
//                 <tr className={styles.tableRow}>
//                   <th colSpan="4" className={styles.groupHeading}>
//                     Confirmed Bookings
//                   </th>
//                 </tr>
//                 {confirmedBookings.map((booking) => (
//                   <tr key={booking._id} className={styles.tableRow}>
//                     <td className={styles.tableCell}>{booking.category}</td>
//                     <td className={styles.tableCell}>
//                       {booking.serviceTakerName}
//                     </td>
//                     <td className={styles.tableCell}>
//                       <span
//                         className={`${styles.statusBadge} ${
//                           styles[booking.currentStatus.toLowerCase()]
//                         }`}
//                       >
//                         {booking.currentStatus}
//                       </span>
//                     </td>
//                     <td>
//                     <div className={styles.file}>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </div>

//                     </td>
//                     <td className={styles.tableCell}>
//                       <button
//                         onClick={() => viewDetails(booking)}
//                         className={styles.actionButton}
//                       >
//                         View Details
//                       </button>
//                       <button
//                         className={styles.actionButton}
//                         onClick={() => handleVerifyRequest(booking._id)}
//                       >
//                         Complete
//                       </button>
//                       <button
//                         className={styles.actionButton}
//                         onClick={() =>
//                           handleRejectWithConfirmation(booking._id)
//                         }
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}

//             {/* Verified Bookings */}
//             {verifiedBookings.length > 0 && (
//               <>
//                 <tr className={styles.tableRow}>
//                   <th colSpan="4" className={styles.groupHeading}>
//                     Confirmation Pending
//                   </th>
//                 </tr>
//                 {verifiedBookings.map((booking) => (
//                   <tr key={booking._id} className={styles.tableRow}>
//                     <td className={styles.tableCell}>{booking.category}</td>
//                     <td className={styles.tableCell}>
//                       {booking.serviceTakerName}
//                     </td>
//                     <td className={styles.tableCell}>
//                       <span
//                         className={`${styles.statusBadge} ${
//                           styles.pendingConfirmation
//                         } ${styles[booking.currentStatus.toLowerCase()]}`}
//                       >
//                         {/* {booking.currentStatus} */}
//                         Confirmation Pending
//                       </span>
//                     </td>
//                     <td className={styles.tableCell}>
//                       <button
//                         onClick={() => viewDetails(booking)}
//                         className={styles.actionButton}
//                       >
//                         View Details
//                       </button>
//                       {booking.serviceProviderStatus === "Pending" ? (
//                         <button
//                           className={styles.actionButton}
//                           onClick={() => confirmCompleteRequest(booking)}
//                         >
//                           Complete
//                         </button>
//                       ) : (
//                         <></>
//                       )}
//                       {/* <button className={styles.actionButton} onClick={() => handleRejectWithConfirmation(booking._id)}>Reject</button> */}
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}

//             {/* Completed Bookings */}
//             {completedBookings.length > 0 && (
//               <>
//                 <tr className={styles.tableRow}>
//                   <th colSpan="4" className={styles.groupHeading}>
//                     Completed Bookings
//                   </th>
//                 </tr>
//                 {completedBookings.map((booking) => (
//                   <tr key={booking._id} className={styles.tableRow}>
//                     <td className={styles.tableCell}>{booking.category}</td>
//                     <td className={styles.tableCell}>
//                       {booking.serviceTakerName}
//                     </td>
//                     <td className={styles.tableCell}>
//                       <span
//                         className={`${styles.statusBadge} ${
//                           styles[booking.currentStatus.toLowerCase()]
//                         }`}
//                       >
//                         {booking.currentStatus}
//                       </span>
//                     </td>
//                     <td className={styles.tableCell}>
//                       <button
//                         onClick={() => viewDetails(booking)}
//                         className={styles.actionButton}
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}

//             {/* Cancelled Bookings */}
//             {cancelledBookings.length > 0 && (
//               <>
//                 <tr className={styles.tableRow}>
//                   <th colSpan="4" className={styles.groupHeading}>
//                     Cancelled Bookings
//                   </th>
//                 </tr>
//                 {cancelledBookings.map((booking) => (
//                   <tr key={booking._id} className={styles.tableRow}>
//                     <td className={styles.tableCell}>{booking.category}</td>
//                     <td className={styles.tableCell}>
//                       {booking.serviceTakerName}
//                     </td>
//                     <td className={styles.tableCell}>
//                       <span
//                         className={`${styles.statusBadge} ${
//                           styles[booking.currentStatus.toLowerCase()]
//                         }`}
//                       >
//                         {booking.currentStatus}
//                       </span>
//                     </td>
//                     <td className={styles.tableCell}>
//                       <button
//                         onClick={() => viewDetails(booking)}
//                         className={styles.actionButton}
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}

//             {/* No bookings found */}
//             {pendingBookings.length === 0 &&
//               confirmedBookings.length === 0 &&
//               verifiedBookings.length === 0 &&
//               completedBookings.length === 0 &&
//               cancelledBookings.length === 0 && (
//                 <tr className={styles.tableRow}>
//                   <td colSpan="4" className={styles.noBookings}>
//                     No bookings found
//                   </td>
//                 </tr>
//               )}
//           </tbody>
//         </table>
//       </div>
//       <ChatBox />

//       {showModal && (
//         <PendingDetailsModaltwo
//           booking={selectedBooking}
//           onClose={closeDetails}
//         />
//       )}
//       {showConfirmModal && (
//         <RequestConfirmModal
//           show={showConfirmModal}
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//         />
//       )}
//       {showCancelModal && (
//         <CancelPendingModal
//           show={showCancelModal}
//           onConfirm={handleCancelConfirm}
//           onCancel={handleCancelCancel}
//         />
//       )}
//       {showCompleteModal && (
//         <CompleteBookingModal
//           show={showCompleteModal}
//           onConfirm={handleCompleteConfirm}
//           onCancel={handleCompleteCancel}
//         />
//       )}
//     </>
//   );
// };

// export default ManageRequests;



import React, { useState, useEffect } from "react";
import styles from "./ManageRequests.module.css";
import Navbar from "../Navbar/Navbar";
import CancelPendingModal from "../AllModals/CancelPendingModal/CancelPendingModal";
import PendingDetailsModaltwo from "../AllModals/PendingDetailsModaltwo/PendingDetailsModaltwo";
import RequestConfirmModal from "../AllModals/RequestConfirmModal/RequestConfirmModal";
import CompleteWithImageModal from "../AllModals/CompleteWithImageModal/CompleteWithImageModal"; 
import AdminDisputeModal from "../AllModals/AdminDisputeModal/AdminDisputeModal";
import ChatBox from "../ChatBox/ChatBox";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase";

const ManageRequests = () => {
  const user = JSON.parse(localStorage.getItem("loginusers"));
  const userName = user ? user.fullName : "User";

  const [userId, setUserId] = useState("");
  const [pendingBookings, setPendingBookings] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [verifiedBookings, setVerifiedBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [disputedBookings, setDisputedBookings] = useState([]);
  const [refundedBookings, setRefundedBookings] = useState([]);
  const [isDisputeModal, setIsDisputeModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingToConfirm, setBookingToConfirm] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteWithImageModal, setShowCompleteWithImageModal] = useState(false); // State for the new modal

  useEffect(() => {
    document.title = "Trusty Taskers - Service Requests";
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
        let response = await fetch(
          `http://localhost:5001/api/bookings/ongoingBooking?userId=${userId}&currentStatus=${status}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let result = await response.json();
        if (result.success) {
          setBookings(result.success);
        }
      } catch (error) {
        console.error(
          `Error fetching ${status.toLowerCase()} bookings:`,
          error
        );
      }
    };

    if (userId) {
      fetchBookings("Pending", setPendingBookings);
      fetchBookings("Confirmed", setConfirmedBookings);
      fetchBookings("Pending Complete", setVerifiedBookings);
      fetchBookings("Completed", setCompletedBookings);
      fetchBookings("Cancelled", setCancelledBookings);
      fetchBookings("Dispute", setDisputedBookings);
      fetchBookings("Refund", setRefundedBookings);
    }
  }, [userId]);

  const handleAcceptRequest = async (bookingId) => {
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
              currentStatus: "Confirmed",
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

  // const handleVerifyRequest = async (bookingId, completionPic) => {
  //   console.log("booking Id",bookingId, completionPic);
  //   if (bookingId && completionPic) {
  //     try {
  //       const imageRef = ref(storage, `images/${completionPic.name}`);
  //       await uploadBytes(imageRef, completionPic);
  //       const imageURL = await getDownloadURL(imageRef);
  //       let update = await fetch(
  //         `http://localhost:5001/api/bookings/handleBookingRequest`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             bookingId,
  //             currentStatus: "Completed",
  //             userId,
  //             completionPic: imageURL,
  //           }),
  //         }
  //       );
  //       console.log("update",update);

  //       let result = await update.json();
  //       console.log("result",result)
  //       if (result.success) {
  //         window.location.reload();
  //       }
  //     } catch (error) {
  //       console.error("Error updating booking status:", error);
  //     }
  //   }
  // };

  const handleVerifyRequest = async (bookingId, completionPic) => {
    console.log("booking Id", bookingId, completionPic);
    if (bookingId && completionPic) {
      try {
        const imageRef = ref(storage, `images/${completionPic.name}`);
        console.log("Uploading image...");
        await uploadBytes(imageRef, completionPic);
        const imageURL = await getDownloadURL(imageRef);
        console.log("Image uploaded, URL:", imageURL);
  
        console.log("Sending update request to API...");
        let update = await fetch(
          `http://localhost:5001/api/bookings/handleBookingRequest`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bookingId,
              currentStatus: "Completed",
              userId,
              completionPic: imageURL,
            }),
          }
        );
  
        console.log("API request completed, response:", update);
        let result = await update.json();
        console.log("Parsed result:", result);
  
        if (result.success) {
          console.log("Update successful, reloading page...");
          window.location.reload();
        } else {
          console.log("Update failed:", result.message);
        }
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    } else {
      console.log("Missing bookingId or completionPic");
    }
  };

  
  const handleRejectRequest = async (bookingId, status) => {
    if (bookingId && status) {
      try {
        let update = await fetch(
          `http://localhost:5001/api/bookings/handleBookingRequest`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentStatus: status, userId, bookingId }),
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
  if (booking.currentStatus === "Dispute" || booking.currentStatus === "Refund") {
    setIsDisputeModal(true);
  } else {
    setShowModal(true);
  }
};

  const closeDetails = () => {
    setSelectedBooking(null);
    setShowModal(false);
    setIsDisputeModal(false);
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
    setShowCompleteWithImageModal(true); // Show the new modal
  };

  const handleCompleteConfirm = (bookingId, image) => {
    handleVerifyRequest(bookingId, image);
    setShowCompleteWithImageModal(false);
  };

  const handleCompleteCancel = () => {
    setBookingToConfirm(null);
    setShowCompleteWithImageModal(false); // Close the new modal
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
                  <th colSpan="4" className={styles.groupHeading}>
                    Pending Bookings
                  </th>
                </tr>
                {pendingBookings.map((booking) => (
                  <tr key={booking._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{booking.category}</td>
                    <td className={styles.tableCell}>
                      {booking.serviceTakerName}
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
                        className={styles.actionButton}
                        onClick={() => confirmAcceptRequest(booking)}
                      >
                        Accept
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() =>
                          handleRejectWithConfirmation(booking._id)
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}

            {/* Confirmed Bookings */}
            {confirmedBookings.length > 0 && (
              <>
                <tr className={styles.tableRow}>
                  <th colSpan="4" className={styles.groupHeading}>
                    Confirmed Bookings
                  </th>
                </tr>
                {confirmedBookings.map((booking) => (
                  <tr key={booking._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{booking.category}</td>
                    <td className={styles.tableCell}>
                      {booking.serviceTakerName}
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
                        className={styles.actionButton}
                        onClick={() => confirmCompleteRequest(booking)}
                      >
                        Complete
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() =>
                          handleRejectWithConfirmation(booking._id)
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}

            {/* Verified Bookings */}
            {verifiedBookings.length > 0 && (
              <>
                <tr className={styles.tableRow}>
                  <th colSpan="4" className={styles.groupHeading}>
                    Confirmation Pending
                  </th>
                </tr>
                {verifiedBookings.map((booking) => (
                  <tr key={booking._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{booking.category}</td>
                    <td className={styles.tableCell}>
                      {booking.serviceTakerName}
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
                      {booking.serviceProviderStatus === "Pending" ? (
                        <button
                          className={styles.actionButton}
                          onClick={() => confirmCompleteRequest(booking)}
                        >
                          Complete
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}

            {/* Completed Bookings */}
            {completedBookings.length > 0 && (
              <>
                <tr className={styles.tableRow}>
                  <th colSpan="4" className={styles.groupHeading}>
                    Completed Bookings
                  </th>
                </tr>
                {completedBookings.map((booking) => (
                  <tr key={booking._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{booking.category}</td>
                    <td className={styles.tableCell}>
                      {booking.serviceTakerName}
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

            {/* Cancelled Bookings */}
            {cancelledBookings.length > 0 && (
              <>
                <tr className={styles.tableRow}>
                  <th colSpan="4" className={styles.groupHeading}>
                    Cancelled Bookings
                  </th>
                </tr>
                {cancelledBookings.map((booking) => (
                  <tr key={booking._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{booking.category}</td>
                    <td className={styles.tableCell}>
                      {booking.serviceTakerName}
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
             {disputedBookings.length > 0 && (
              <>
                <tr className={styles.tableRow}>
                  <th colSpan="4" className={styles.groupHeading}>
                    Disputed Bookings
                  </th>
                </tr>
                {disputedBookings.map((booking) => (
                  <tr key={booking._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{booking.category}</td>
                    <td className={styles.tableCell}>
                      {booking.serviceTakerName}
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
            {refundedBookings.length > 0 && (
              <>
                <tr className={styles.tableRow}>
                  <th colSpan="4" className={styles.groupHeading}>
                    Refunded Bookings
                  </th>
                </tr>
                {refundedBookings.map((booking) => (
                  <tr key={booking._id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{booking.category}</td>
                    <td className={styles.tableCell}>
                      {booking.serviceTakerName}
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
            

            {/* No bookings found */}
            {pendingBookings.length === 0 &&
              confirmedBookings.length === 0 &&
              verifiedBookings.length === 0 &&
              completedBookings.length === 0 &&
              cancelledBookings.length === 0 &&
              disputedBookings.length === 0 &&
              refundedBookings.length === 0 && (
                <tr className={styles.tableRow}>
                  <td colSpan="4" className={styles.noBookings}>
                    No bookings found
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <ChatBox />

      {/* {showModal && (
        <PendingDetailsModaltwo
          booking={selectedBooking}
          onClose={closeDetails}
        />
      )} */}
      {showModal && !isDisputeModal && (
        <PendingDetailsModaltwo
          booking={selectedBooking}
          onClose={closeDetails}
        />
      )}

      {isDisputeModal && (
        <AdminDisputeModal
          booking={selectedBooking}
          onClose={closeDetails}
        />
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
      {showCompleteWithImageModal && (
        <CompleteWithImageModal
          show={showCompleteWithImageModal}
          onConfirm={handleCompleteConfirm}
          onCancel={handleCompleteCancel}
          booking={bookingToConfirm}
        />
      )}
    </>
  );
};

export default ManageRequests;