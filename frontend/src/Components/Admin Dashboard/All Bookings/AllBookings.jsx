import React, { useEffect, useState } from 'react';
import styles from './AllBookings.module.css';
import AdminNavbar from '../Admin Navbar/AdminNavbar';
import Footer from '../../Footer/Footer';
import AdminViewDetailsModal from '../../AllModals/AdminViewDetailsModal/AdminViewDetailsModal';
import AdminDisputeModal from '../../AllModals/AdminDisputeModal/AdminDisputeModal';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDisputeModal, setIsDisputeModal] = useState(false);
    const [isRefundModal, setIsRefundModal] = useState(false);

    useEffect(() => {
        document.title = "Trusty Taskers - Booking History";
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${BASE_URL}/admin/getAllBookings`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings", error);
            }
        };

        fetchBookings();
    }, []);

    const viewDetails = (booking) => {
        setSelectedBooking(booking);
        setIsDisputeModal(booking.currentStatus === 'Dispute');
        setIsRefundModal(booking.currentStatus === 'Refund');
        setShowModal(true);
    };

    const closeDetails = () => {
        setSelectedBooking(null);
        setShowModal(false);
        setIsDisputeModal(false);
        setIsRefundModal(false);
    };

    const handleCompleteBooking = async (bookingId, currentStatus) => {
        try {
            const response = await fetch(`${BASE_URL}/bookings/handleBookingRequest`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId, currentStatus }),
            });

            const result = await response.json();
            if (result.success) {
                // setBookings(bookings.map(booking => 
                //     booking._id === bookingId ? { ...booking, currentStatus: 'Completed' } : booking
                // ));
                window.location.reload();
            }
        } catch (error) {
            console.error('Error completing booking', error);
        }
    };

    const sortedBookings = bookings.sort((a, b) => {
        const statusOrder = {
            'Pending': 1,
            'Confirmed': 2,
            'Pending Complete': 3,
            'Completed': 4,
            'Cancelled': 5,
            'Dispute': 6,
            'Refund': 7
        };

        return statusOrder[a.currentStatus] - statusOrder[b.currentStatus];
    });

    return (
        <>
            <AdminNavbar />
            <h1 className={styles.mainHeading}>All Bookings</h1>
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
                                {sortedBookings.filter((booking) => booking.currentStatus === 'Pending').length > 0 && (
                                    <>
                                        <tr className={styles.tableRow}>
                                            <th colSpan="4" className={styles.groupHeading}>Pending Bookings</th>
                                        </tr>
                                        {sortedBookings.filter((booking) => booking.currentStatus === 'Pending').map((booking) => (
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

                                {sortedBookings.filter((booking) => booking.currentStatus === 'Confirmed').length > 0 && (
                                    <>
                                        <tr className={styles.tableRow}>
                                            <th colSpan="4" className={styles.groupHeading}>Confirmed Bookings</th>
                                        </tr>
                                        {sortedBookings.filter((booking) => booking.currentStatus === 'Confirmed').map((booking) => (
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

                                {sortedBookings.filter((booking) => booking.currentStatus === 'Pending Complete').length > 0 && (
                                    <>
                                        <tr className={styles.tableRow}>
                                            <th colSpan="4" className={styles.groupHeading}>Confirmation Pending Bookings</th>
                                        </tr>
                                        {sortedBookings.filter((booking) => booking.currentStatus === 'Pending Complete').map((booking) => (
                                            <tr key={booking._id} className={styles.tableRow}>
                                                <td className={styles.tableCell}>{booking.category}</td>
                                                <td className={styles.tableCell}>{booking.serviceTakerName}</td>
                                                <td className={styles.tableCell}>
                                                    <span className={`${styles.statusBadge} ${styles.confirmation_pending} ${styles[booking.currentStatus.toLowerCase()]}`}>
                                                        Confirmation Pending
                                                    </span>
                                                </td>
                                                <td className={styles.tableCell}>
                                                    <button onClick={() => viewDetails(booking)} className={styles.actionButton}>View Details</button>
                                                    <button onClick={() => handleCompleteBooking(booking._id,'Completed')} className={styles.actionButton}>Complete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                                {sortedBookings.filter((booking) => booking.currentStatus === 'Cancelled').length > 0 && (
                                    <>
                                        <tr className={styles.tableRow}>
                                            <th colSpan="4" className={styles.groupHeading}>Cancelled Bookings</th>
                                        </tr>
                                        {sortedBookings.filter((booking) => booking.currentStatus === 'Cancelled').map((booking) => (
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

                                {sortedBookings.filter((booking) => booking.currentStatus === 'Completed').length > 0 && (
                                    <>
                                        <tr className={styles.tableRow}>
                                            <th colSpan="4" className={styles.groupHeading}>Completed Bookings</th>
                                        </tr>
                                        {sortedBookings.filter((booking) => booking.currentStatus === 'Completed').map((booking) => (
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

                                {sortedBookings.filter((booking) => booking.currentStatus === 'Dispute').length > 0 && (
                                    <>
                                        <tr className={styles.tableRow}>
                                            <th colSpan="4" className={styles.groupHeading}>Dispute Bookings</th>
                                        </tr>
                                        {sortedBookings.filter((booking) => booking.currentStatus === 'Dispute').map((booking) => (
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
                                                    
                                                    <button onClick={() => handleCompleteBooking(booking._id,"Completed")} className={styles.actionButton}>Complete</button>

                                                    
                                                    <button onClick={() => handleCompleteBooking(booking._id,"Refund")} className={styles.actionButton}>Refund</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                                {sortedBookings.filter((booking) => booking.currentStatus === 'Refund').length > 0 && (
                                    <>
                                        <tr className={styles.tableRow}>
                                            <th colSpan="4" className={styles.groupHeading}>Refunded Bookings</th>
                                        </tr>
                                        {sortedBookings.filter((booking) => booking.currentStatus === 'Refund').map((booking) => (
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
                            </>
                        ) : (
                            <tr className={styles.tableRow}>
                                <td colSpan="4" className={styles.noBookings}>No bookings found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && selectedBooking && (
                isDisputeModal || isRefundModal ? (
                    <AdminDisputeModal booking={selectedBooking} onClose={closeDetails} />
                ) : (
                    <AdminViewDetailsModal booking={selectedBooking} onClose={closeDetails} />
                )
            )}
            <Footer />
        </>
    );
};

export default AllBookings;
