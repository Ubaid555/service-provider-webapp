// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import styles from './Paymentform.module.css'; 
// import PaymentCard from '../PaymentCard/PaymentCard';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';

// const Paymentform = () => {
//  const [cardNumber, setCardNumber] = useState('');
//  const [cardHolder, setCardHolder] = useState('');
//  const [expiryDate, setExpiryDate] = useState('');
//  const [cvv, setCvv] = useState('');
//  const [focus, setFocus] = useState('');
//  const [isCardFlipped, setIsCardFlipped] = useState(false); // New state for card flip
 

//  const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Payment submitted');
//  };

//  const handleCardHolderChange = (e) => {
//     const input = e.target.value;
//     const isValidName = /^[A-Za-z\s]*$/.test(input);
//     if (isValidName || input === '') {
//       setCardHolder(input);
//     }
//  };

//  const handleCardNumberChange = (e) => {
//     const input = e.target.value;
//     const isValidNumber = /^[0-9]*$/.test(input);
//     if (isValidNumber || input === '') {
//       setCardNumber(input);
//     }
//  };

//  const handleCvvChange = (e) => {
//   const input = e.target.value;
//   const isValidNumber = /^[0-9]*$/.test(input);
//   if (isValidNumber || input === '') {
//     setCvv(input);
//   }
// };

//  const handleExpiryDateChange = (e) => {
//     let input = e.target.value.replace(/\D/g, '').substring(0, 6);
//     if (input.length > 2) {
//       const month = input.slice(0, 2);
//       const year = input.slice(2);
//       if (parseInt(month) > 12) {
//         input = `12/${year}`;
//       } else {
//         input = `${month}/${year}`;
//       }
//     }
//     setExpiryDate(input);
//  };

//  useEffect(() => {
//     document.title = "Trusty Taskers - Payment Details";
//  }, []);

//  return (
//     <div>
//       <Navbar/>
//       <h1 className={styles.heading_styles}>Payment Details</h1>
    
//       <div className={styles.whole_content}>
//         <div className={styles.card_container}>
//             <PaymentCard
//               cardNumber={cardNumber}
//               cardHolder={cardHolder}
//               expiryDate={expiryDate}
//               cvv={cvv}
//               focused={focus}
//               isCardFlipped={isCardFlipped} /> 
//         </div>

//         <div className={styles.paypak_container}>
//             <img className={styles.paypak_image} src='Images/paypak.png' alt='Pay-Pak' width='200px'/>
//         </div>

//         <div className={styles.paymentform}>
//           <form className={styles.payform} onSubmit={handleSubmit}>
//             <div className={styles.form_field}>
//               <label className={styles.label} htmlFor="cardHolder">Card Holder Name</label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 id="cardHolder"
//                 value={cardHolder}
//                 onChange={handleCardHolderChange}
//                 onFocus={(e) => setFocus(e.target.name)}
//                 maxLength="20"
//                 required
//               />
//             </div>

//             <div className={styles.form_field}>
//               <label className={styles.label} htmlFor="cardNumber">Card Number</label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 id="cardNumber"
//                 value={cardNumber}
//                 onChange={handleCardNumberChange}
//                 onFocus={(e) => setFocus(e.target.name)}
//                 maxLength="16"
//                 required
//               />
//             </div>

//             <div className={styles.form_field}>
//               <label className={styles.label} htmlFor="expiryDate">Expiry Date</label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 id="expiryDate"
//                 value={expiryDate}
//                 onChange={handleExpiryDateChange}
//                 onFocus={(e) => setFocus(e.target.name)}
//                 maxLength="7"
//                 placeholder="MM/YY"
//                 required
//               />
//             </div>

//             <div className={styles.form_field}>
//               <label className={styles.label} htmlFor="cvv">CVV</label>
//               <input
//                 className={styles.input} 
//                 type="text"
//                 id="cvv"
//                 value={cvv}
//                 onChange={handleCvvChange}
//                 onFocus={(e) => {
//                  setFocus(e.target.name);
//                  setIsCardFlipped(true); // Flip card on focus
//                 }}
//                 onBlur={() => setIsCardFlipped(false)} // Flip card back on blur
//                 maxLength="3"
//                 required
//               />
//             </div>
//             <button className={styles.paybtn} type="submit">Pay Now</button>
//           </form>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//  );
// };

// export default Paymentform;


import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Paymentform.module.css';
import PaymentCard from '../PaymentCard/PaymentCard';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Paymentform = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [cvv, setCvv] = useState('');
  const [focus, setFocus] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length !== 16) {
      alert('Card number must be exactly 16 digits');
      return;
    }

    const currentDate = new Date();
    if (expiryDate <= currentDate) {
      alert('Expiry date must be in the future');
      return;
    }

    console.log('Payment submitted');
  };

  const handleCardHolderChange = (e) => {
    const input = e.target.value;
    const isValidName = /^[A-Za-z\s]*$/.test(input);
    if (isValidName || input === '') {
      setCardHolder(input);
    }
  };

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (input.length <= 16) {
      setCardNumber(input);
    }
  };

  const handleCvvChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (input.length <= 3) {
      setCvv(input);
    }
  };

  useEffect(() => {
    document.title = "Trusty Taskers - Payment Details";
  }, []);

  return (
    <div>
      <Navbar/>
      <h1 className={styles.heading_styles}>Payment Details</h1>
    
      <div className={styles.whole_content}>
        <div className={styles.card_container}>
            <PaymentCard
              cardNumber={cardNumber}
              cardHolder={cardHolder}
              expiryDate={expiryDate ? `${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}` : ''}
              cvv={cvv}
              focused={focus}
              isCardFlipped={isCardFlipped} /> 
        </div>

        <div className={styles.paypak_container}>
            <img className={styles.paypak_image} src='Images/paypak.png' alt='Pay-Pak' width='200px'/>
        </div>

        <div className={styles.paymentform}>
          <form className={styles.payform} onSubmit={handleSubmit}>
            <div className={styles.form_field}>
              <label className={styles.label} htmlFor="cardHolder">Card Holder Name</label>
              <input
                className={styles.input}
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={cardHolder}
                onChange={handleCardHolderChange}
                onFocus={(e) => setFocus(e.target.name)}
                maxLength="20"
                required
              />
            </div>

            <div className={styles.form_field}>
              <label className={styles.label} htmlFor="cardNumber">Card Number</label>
              <input
                className={styles.input}
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                onFocus={(e) => setFocus(e.target.name)}
                maxLength="16"
                required
              />
            </div>

            <div className={styles.form_field}>
              <label className={styles.label} htmlFor="expiryDate">Expiry Date</label>
              <DatePicker
                style={{ width: '100%'}}
                className={styles.input}
                selected={expiryDate}
                onChange={(date) => setExpiryDate(date)}
                onFocus={(e) => setFocus('expiryDate')}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                minDate={new Date()}
                placeholderText="MM/YYYY"
                required
              />
            </div>

            <div className={styles.form_field}>
              <label className={styles.label} htmlFor="cvv">CVV</label>
              <input
                className={styles.input} 
                type="text"
                id="cvv"
                name="cvv"
                value={cvv}
                onChange={handleCvvChange}
                onFocus={(e) => {
                 setFocus(e.target.name);
                 setIsCardFlipped(true); // Flip card on focus
                }}
                onBlur={() => setIsCardFlipped(false)} // Flip card back on blur
                maxLength="3"
                required
              />
            </div>
            <button className={styles.paybtn} type="submit">Pay Now</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Paymentform;