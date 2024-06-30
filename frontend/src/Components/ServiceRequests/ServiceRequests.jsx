import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from "./ServiceRequests.module.css";
import Footer from '../Footer/Footer';

export const ServiceRequests = () => {
    const [booking,setBooking]=useState([]);


    useEffect(() => {
        ServiceBooked();
    }, []);

    
const ServiceBooked = async ()=>{
    const userId = JSON.parse(localStorage.getItem("loginusers"))._id;
    let result = await fetch(`http://localhost:4500/showBookedService?userId=${userId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        } 
    })
    result = await result.json();
    console.log(result);
    setBooking(result);
}
    return (
        <>
            <Navbar/>
            <h1 className={styles.main_heading}>{JSON.parse(localStorage.getItem("loginusers")).name}'s PROFILE</h1>

            <div className={styles.section_white}>
                {booking.length > 0 ? (
                    booking.map((bookings) => (
                        <div key={bookings._id} className={styles.card}>
                            <img
                                className={styles.teamImg}
                                src={bookings.image}
                                alt="profile-img"
                            />
                            <div className={styles.cardInfo}>
                                <form>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="category" className={styles.cardCategory}>Profession</label>
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            value={bookings.category}
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
                                            value={bookings.name}
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
                                            value={bookings.phone}
                                            className={styles.cardInput}
                                            readOnly
                                        />
                                    </div>
                                 
                                    <div className={styles.formGroup}>
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={bookings.description}
                                            className={styles.cardInput}
                                            readOnly
                                        />
                                    </div>
                                    <button 
                                        type="button" 
                                        className={styles.cardBtn} 
                                        // onClick={() => handleUpdateProfile(profile)}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        type="button" 
                                        className={styles.cardBtn} 
                                        //onClick={() => handleDeleteProfile(profile.userId,profile.category)}
                                    >
                                        Reject
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.oops}>
                    <p className={styles.no_services}>Add services first</p>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );

};

export default ServiceRequests;