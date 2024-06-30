// PaymentConfirmation.jsx
import React, {useEffect} from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {

  useEffect(() => {
    document.title = "Trusty Taskers - Payment Confirm";
  }, []);

 return (
    <div className="confirmationContainer">
      <CheckCircleIcon className="icon" />
      <div className="message">
        Payment Successful!
      </div>
      <div>
        Your payment has been successfully processed. Thank you for your booking!
      </div>
      <Link to='/'>
        <button className="confirmationButton">Back to home</button>
      </Link>
    </div>
 );
};

export default PaymentConfirmation;
