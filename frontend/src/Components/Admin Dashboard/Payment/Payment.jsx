import React, { useState } from 'react';
import { useEffect } from 'react';
import { AdminNavbar } from '../Admin Navbar/AdminNavbar';

export const Payment = () => {
  const [payment,setPayment]=useState([]);
  useEffect(() => {
    document.title = "Trusty Taskers - Payment History";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/payment/viewPayment`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();
        console.log(result.success);
        setPayment(result.success); // Assuming `result.success` is the correct format
        console.log("payment",payment);
      } catch (err) {
        // setError(t("Error fetching data"));
      }
    };
  
    fetchData();
  }, []);

  return (
    <> 
    <AdminNavbar/>
    
    </>
  )
}

export default Payment