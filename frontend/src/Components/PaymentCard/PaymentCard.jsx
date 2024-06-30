import React from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from './PaymentCard.module.css';

const PaymentCard = ({ cardNumber, cardHolder, expiryDate, cvv, isCardFlipped }) => {
 // Format card number
 const formattedCardNumber = cardNumber.replace(/\d{4}(?=.)/g, '$& ');

 // Format expiry date
 const formattedExpiryDate = expiryDate.replace(/(\d{2})(\d{4})/, '$1/$2');

 // Check if cardHolder is empty
 const cardHolderPlaceholder = cardHolder ? cardHolder : 'Card Holder Name';

 // Check if expiryDate is empty
 const expiryDatePlaceholder = expiryDate ? formattedExpiryDate : 'MM/YY';

 // Check if cardNumber is empty
 const cardNumberPlaceholder = cardNumber ? formattedCardNumber : '**** **** **** ****';

 return (
  <div className={styles.cardContainer}>
    <ReactCardFlip
      isFlipped={isCardFlipped}
      flipDirection="vertical"
      flipSpeedBackToFront={3}
      flipSpeedFrontToBack={3}
    >
      <div className={`${styles.card} ${styles.front}`}>
        <img src="Images/visa.png" height='40px' width='60px' alt="Logo" className={styles.visa_Logo} />
        <img src="Images/sim.png" height='50px' width='60px' alt="Logo" className={styles.sim_Logo} />
        <div className={styles.cardNumber}>{cardNumberPlaceholder}</div>
        <div className={styles.line}>
          <div className={styles.cardHolder}>{cardHolderPlaceholder}</div>
          <div className={styles.expiryDate}>{expiryDatePlaceholder}</div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.back}`}>
        <div>
          <div className={styles.num}>For Customer Service - Call at 0302-9428807 </div>
        </div>

        <div className={styles.whiteColor}>
          <div className={styles.cvv}>{cvv}</div>
        </div>

        <div>
          <div className={styles.paraText}>For security purposes, please ensure that you are the only individual
           to have access to this card. Protect your card details and personal identification number (PIN) at 
           all times. Never disclose your PIN to anyone, including bank representatives.</div>
        </div>
      </div>
    </ReactCardFlip>
  </div>
 );
};

export default PaymentCard;
