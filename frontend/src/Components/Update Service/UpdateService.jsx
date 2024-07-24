import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './UpdateService.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const UpdateService = () => {
    console.log("Updating Profile");
    const location = useLocation();
    const navigate = useNavigate();
    const { profile } = location.state;

    const [updatedProfile, setUpdatedProfile] = useState(profile);

    useEffect(() => {
        console.log('Profile data from location state:', profile);
        document.title = "Trusty Taskers - Updated Profile";

        // Check if profile and fullName are correctly set
        console.log('Initial fullName from profile:', profile.fullName);
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Handling change for:', name, 'with value:', value);
        setUpdatedProfile({
            ...updatedProfile,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("loginusers"))._id;

        try {
            console.log('Submitting updated profile:', updatedProfile);
            let update = await fetch(`http://localhost:5001/api/services/updateService?userId=${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProfile)
            });

            update = await update.json();

            if (update.success) {
                toast.success(update.success);
                setTimeout(() => {
                    navigate('/myservices');
                }, 1500);
            } else {
                toast.error(update.error);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    console.log('Render updatedProfile:', updatedProfile);

    return (
        <>
            <Navbar />
            <h1 className={styles.main_heading}>Update {JSON.parse(localStorage.getItem("loginusers")).fullName}'s PROFILE</h1>
            <div className={styles.updateProfileContainer}>
                <form className={styles.cardInfo} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.cardCategory}>Profession</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={updatedProfile.category}
                            className={styles.cardInput}
                            readOnly
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.cardTitle}>Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={updatedProfile.fullName}
                            onChange={handleChange}
                            className={styles.cardInput}
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
                    <button type="submit" className={styles.cardBtn}>Update Profile</button>
                </form>
            </div>
            <ToastContainer />
            <Footer />
        </>
    );
};

export default UpdateService;