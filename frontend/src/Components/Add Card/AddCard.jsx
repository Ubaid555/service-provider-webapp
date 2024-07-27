import React from "react";
import { useEffect } from "react";
import styles from "./AddCard.module.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AddCardPage = () => {
  const handleAddCard = () => {
    console.log("Card added successfully");
  };

  useEffect(() => {
    document.title = "Trusty Taskers - Add Card";
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.all_items}>
        <h1 className={styles.heading}>Add PayPak Card</h1>
        <div className={styles.add_card_container}>
          <div className={styles.image_container}>
            <img
              className={styles.addcard_img}
              src="Images/addcard.png"
              alt="Add Card"
              height="300px"
              width="350px"
            />
          </div>

          <div className={styles.whole_para}>
            <p className={styles.para}>
              To add a PayPak card, please make sure you have your card details
              ready. Once you're ready, click the button below to proceed.
              Ensure that you have your card holder name, card number,
              expiration date, and CVV code handy.
            </p>

            <NavLink
              to="/paymentform"
              className={styles.addcard_btn}
              onClick={handleAddCard}
            >
              Add Card
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCardPage;
