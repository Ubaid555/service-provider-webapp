import React, { useEffect, useState } from 'react';
import styles from './AllBookings.module.css';
import AdminNavbar from '../Admin Navbar/AdminNavbar';
import Footer from '../../Footer/Footer';
import BookingDetailsModal from '../../AllModals/BookingDetailsModal/BookingDetailsModal'; // Make sure to import the modal if you want to show booking details

export const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null); 
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        document.title = "Trusty Taskers - Booking History";
      }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/admin/getAllBookings');
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
        setShowModal(true);
    };

    const closeDetails = () => {
        setSelectedBooking(null);
        setShowModal(false);
    };

    const sortedBookings = bookings.sort((a, b) => {
        const statusOrder = {
            'Pending': 1,
            'Confirmed': 2,
            'Cancelled': 3,
            'Completed': 4
        };

        return statusOrder[a.currentStatus] - statusOrder[b.currentStatus];
    });

    const renderBookingRows = (status) => {
        return sortedBookings
            .filter(booking => booking.currentStatus === status)
            .map((booking) => (
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
            ));
    };

    return (
        <>
        <AdminNavbar/>
            <h1 className={styles.main_heading}>All Bookings</h1>
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
                                {renderBookingRows('Pending').length > 0 && (
                                    <tr className={styles.statusRow}>
                                        <td colSpan="4" className={styles.statusHeader}><b>PENDING</b></td>
                                    </tr>
                                )}
                                {renderBookingRows('Pending')}

                                {renderBookingRows('Confirmed').length > 0 && (
                                    <tr className={styles.statusRow}>
                                        <td colSpan="4" className={styles.statusHeader}><b>CONFIRMED</b></td>
                                    </tr>
                                )}
                                {renderBookingRows('Confirmed')}

                                {renderBookingRows('Cancelled').length > 0 && (
                                    <tr className={styles.statusRow}>
                                        <td colSpan="4" className={styles.statusHeader}><b>CANCELLED</b></td>
                                    </tr>
                                )}
                                {renderBookingRows('Cancelled')}

                                {renderBookingRows('Completed').length > 0 && (
                                    <tr className={styles.statusRow}>
                                        <td colSpan="4" className={styles.statusHeader}><b>COMPLETED</b></td>
                                    </tr>
                                )}
                                {renderBookingRows('Completed')}
                            </>
                        ) : (
                            <tr className={styles.tableRow}>
                                <td colSpan="4" className={styles.noBookings}>No bookings found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <BookingDetailsModal booking={selectedBooking} onClose={closeDetails} />
            )}
            <Footer />
        </>
    );
};

export default AllBookings;

