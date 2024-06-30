import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './UpdateService.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const UpdateProfile = () => {
    const location = useLocation();
    //const navigate = useNavigate();
    const { profile } = location.state; // get the profile data from state

    const [updatedProfile, setUpdatedProfile] = useState(profile);

    useEffect(() => {
        document.title = "Trusty Taskers - Update Profile";
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({
            ...updatedProfile,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("loginusers"))._id;
        const category = updatedProfile.category;
        
        try {
            let update = await fetch(`http://localhost:5001/api/services/updateService`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userId,category})
            });

            console.log(update)

            update = await update.json();

            if (update.success) {
                toast.success(update.success);
            } else {
                toast.error(update.error);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };
    
    return (
        <>
        <Navbar/>
        <h1 className={styles.main_heading}>Update {JSON.parse(localStorage.getItem("loginusers")).fullName}'s SERVICES</h1>
        <div className={styles.updateProfileContainer}>
            <form className={styles.cardInfo}>
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.cardCategory}>Profession</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={updatedProfile.category}
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
                        value={updatedProfile.fullName}
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
                        value={updatedProfile.phone}
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
                        value={updatedProfile.price}
                        onChange={handleChange}
                        className={styles.cardInput}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={updatedProfile.description}
                        onChange={handleChange}
                        className={styles.cardInput}
                    />
                </div>
                <button onClick={handleSubmit} type="submit" className={styles.cardBtn}>Update Service</button>
            </form>
        </div>
        <ToastContainer/>
        <Footer/>
        </>
    );
};

export default UpdateProfile;