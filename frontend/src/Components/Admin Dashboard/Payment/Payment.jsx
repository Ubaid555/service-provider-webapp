import React from 'react';
import { useEffect } from 'react';

export const Payment = () => {
  useEffect(() => {
    document.title = "Trusty Taskers - Payment History";
  }, []);

  return (
    <div>Payment</div>
  )
}

export default Payment