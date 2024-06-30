import React from 'react';
import { useEffect } from 'react';
import styles from './AddCard.module.css';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const AddCardPage = () => {
  const handleAddCard = () => {
    // Implement your logic to add the card
    console.log('Card added successfully');
  };

  useEffect(() => {
    document.title = "Trusty Taskers - Add Card";
  }, []);
  return (
    <>
    <Navbar/>
    <div className={styles.add_card_container}>
      <h1 className={styles.heading}>Add PayPak Card</h1>
      <div className={styles.image_container}>
        <img className={styles.addcard_img} src="Images/addcard.png" alt='Add Card' height='350px' width='450px'/>
      </div>

      <div className={styles.whole_para}>
        <p className={styles.para}>
          To add a PayPal card, please make sure you have your card details ready. Once you're ready, click the 
          button below to proceed. Ensure that you have your card holder name, card number, expiration date, 
          and CVV code handy. 
        </p>
        <NavLink className={styles.addbtn} to='/paymentform'>
          <button className={styles.addcard_btn} onClick={handleAddCard}>Add Card</button>
        </NavLink>
        
      </div>
    </div>
    </>
  );
};

export default AddCardPage;
