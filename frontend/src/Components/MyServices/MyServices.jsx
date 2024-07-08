import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import styles from "./MyServices.module.css";
import Footer from '../Footer/Footer';
import ConfirmModal from '../AllModals/ConfirmModal/ConfirmModal';
import ChatBox from '../ChatBox/ChatBox';

export const MyServices = () => {
    const [Sdata, setSdata] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteProfileId, setDeleteProfileId] = useState(null);
    const [deleteProfileCategory, setDeleteProfileCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Trusty Taskers - My Services";
    }, []);

    useEffect(() => {
        showProfileDetail();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5001/api/services/service`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
            const result = await response.json();
            setSdata(result);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    const showProfileDetail = async () => {
        const userId = JSON.parse(localStorage.getItem("loginusers"))._id;
        let result = await fetch(`http://localhost:5001/api/services/myservice?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        setUserProfile(result);    
    };

    const handleUpdateProfile = (profile) => {
        navigate('/updateprofile', { state: { profile } });
    };

    const handleDeleteProfile = async(id,category)=>{
        try {
            const response = await fetch(`http://localhost:5001/api/services/deleteService?userId=${id}&category=${category}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                if (result.success) {
                    alert("Service deleted successfully");
                } else {
                    alert(result.error);
                }
            } else {
                console.error('Failed to delete:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            window.location.reload();
        }
    }

    const showDeleteConfirmation = (id, category) => {
                setDeleteProfileId(id);
                setDeleteProfileCategory(category);
                setShowConfirm(true);
            };
        
            const confirmDelete = () => {
                handleDeleteProfile(deleteProfileId, deleteProfileCategory);
                setShowConfirm(false);
            };
        
            const cancelDelete = () => {
                setShowConfirm(false);
            };

    const getImageForCategory = (category) => {
        if (category) {
            if(Sdata.length>0){
            const selectedCategory = Sdata.find(item => item.sname === category);
            if (selectedCategory) {
              return(selectedCategory.imgsrc);
            } else {
                return '/Images/default.png';
            }
        }
        else {
            return '/Images/default.png';
        }
          }
        // switch(category.toLowerCase()) {
        //     case 'electrician':
        //         return '/Images/electrician.jpeg';
        //     case 'plumber':
        //         return '/Images/plumber.png';
        //     case 'mechanic':
        //         return '/Images/mechanic.png';
        //     case 'cable operator':
        //         return '/Images/cable operator.jpg';
        //     case 'labor':
        //         return '/Images/labor.png';
        //     case 'carpenter':
        //         return '/Images/carpenter.png';
        //     default:
        //         return '/Images/default.png'; 
        // }
    }

    return (
        <>
            <Navbar/>
            <h1 className={styles.main_heading}>{JSON.parse(localStorage.getItem("loginusers")).fullName}'s SERVICES</h1>
            <div className={styles.section_white}>
                {userProfile.length > 0 && (
                    <img
                        className={styles.teamImg}
                        src={userProfile[0].profilePic}
                        alt="profile-img"
                    />
                )}
                <hr/>
                <div className={styles.formContainer}>
                    {userProfile.length > 0 ? (
                        userProfile.map((profile, index) => (
                            <div key={profile._id} className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <h2 className={styles.serviceHeading}>Service {index + 1}</h2>
                                    <form>
                                        <img 
                                            className={styles.card_image} 
                                            src={getImageForCategory(profile.category)} 
                                            alt='service-img' 
                                            height='70px' 
                                            width='70px'
                                        />
                                        <div className={styles.formGroup}>
                                            <label htmlFor="category" className={styles.cardCategory}>Profession</label>
                                            <input
                                                type="text"
                                                id="category"
                                                name="category"
                                                value={profile.category}
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
                                                value={profile.fullName}
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
                                                value={profile.phone}
                                                className={styles.cardInput}
                                                readOnly
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="price">Price</label>
                                            <input
                                                type="text"
                                                id="price"
                                                name="price"
                                                value={profile.price}
                                                className={styles.cardInput}
                                                readOnly
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="description">Description</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={profile.description}
                                                className={styles.cardInput}
                                                readOnly
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            className={styles.cardBtn} 
                                            onClick={() => handleUpdateProfile(profile)}
                                        >
                                            Update Services
                                        </button>
                                        <button 
                                            type="button" 
                                            className={styles.cardBtn} 
                                            onClick={() => showDeleteConfirmation(profile.userId, profile.category)}
                                        >
                                            Delete
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
            </div>
            <ChatBox/>
            <Footer/>
            <ConfirmModal 
                show={showConfirm} 
                onConfirm={confirmDelete} 
                onCancel={cancelDelete} 
            />
        </>
    );
};

export default MyServices;