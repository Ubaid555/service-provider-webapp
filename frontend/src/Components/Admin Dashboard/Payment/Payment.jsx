import React from 'react';
import { useEffect } from 'react';
import { AdminNavbar } from '../Admin Navbar/AdminNavbar';

export const Payment = () => {
  useEffect(() => {
    document.title = "Trusty Taskers - Payment History";
  }, []);

  return (
    <>
    <AdminNavbar/>
    <div>Payment</div>
    </>
  )
}

export default Payment