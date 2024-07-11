import React, { useEffect, useState } from 'react';
import styles from './Accounts.module.css';
import AdminNavbar from '../Admin Navbar/AdminNavbar';
import Footer from '../../Footer/Footer';

const Accounts = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = "Trusty Taskers - User Accounts";
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/admin/getAllUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <h1 className={styles.mainhead}>User's Accounts</h1>
      <div className={styles.accountsContainer}>
        {users.length ? (
          <div className={styles.userCards}>
            {users.map((user) => (
              <div key={user._id} className={styles.userCard}>
                <img src={user.profilePic} alt={`${user.name}'s profile`} className={styles.profilePic} />
                <div className={styles.userInfo}>
                  <h2>{user.fullName}</h2>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.notFound}>No users found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Accounts;
