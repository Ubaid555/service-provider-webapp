import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './UpdateBooking.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const UpdateBooking = () => {
    const location = useLocation();
    //const navigate = useNavigate();
    const { booking } = location.state; 

    const [updatedBooking, setUpdatedBooking] = useState(booking);
    const bookingId=updatedBooking._id;

    useEffect(() => {
        document.title = "Trusty Taskers - Update Booking";
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking({
            ...updatedBooking,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = updatedBooking._id;
        
        try {
            let update = await fetch(`http://localhost:4500/updateBooking?userId=${bookingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBooking)
            });
    
            update = await update.json();
    
            if (update.result === 'Result successfully Updated') {
                toast.success("Profile updated successfully!");
                
            } else {
                toast.error("Unsuccessful Updation");
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

  return (
    <>
    <Navbar/>
    <h1 className={styles.main_heading}>Update {JSON.parse(localStorage.getItem("loginusers")).name}'s PROFILE</h1>
    <div className={styles.updateProfileContainer}>
        <form className={styles.cardInfo}>
            <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.cardCategory}>Profession</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={updatedBooking.category}
                    // onChange={handleChange}
                    className={styles.cardInput}
                    readOnly
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.cardTitle}>Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedBooking.name}
                   // onChange={handleChange}
                    className={styles.cardInput}
                    readOnly
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={updatedBooking.phone}
                    onChange={handleChange}
                    className={styles.cardInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={updatedBooking.price}
                    onChange={handleChange}
                    className={styles.cardInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={updatedBooking.description}
                    onChange={handleChange}
                    className={styles.cardInput}
                />
            </div>
            <button onClick={handleSubmit} type="submit" className={styles.cardBtn}>Update Profile</button>
        </form>
    </div>
    <ToastContainer/>
    <Footer/>
    </>
  )
}

export default UpdateBooking