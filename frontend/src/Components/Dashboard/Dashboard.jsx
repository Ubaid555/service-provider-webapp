import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    document.title = "Trusty Taskers - Dashboard";
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.dashboard}>
        <nav className={`${styles.navbar} ${showMenu ? styles.showMenu : ''}`}>
          {/* Toggle button for small screens */}
          <button className={`${styles.menuButton} ${showMenu ? styles.closeButton : ''}`} onClick={toggleMenu}>
            {showMenu ? (
              <>
                <i className="fa fa-times" style={{ marginRight: '10px' }}></i> CLOSE
              </>
            ) : (
              <>
                <i className="fa fa-bars" style={{ marginRight: '10px' }}></i> DASHBOARD MENU
              </>
            )}
          </button>

          {/* Dropdown menus */}
          {/* <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
            >
              <i className="fa fa-file" style={{ marginRight: '10px' }}></i> Overview
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item as={NavLink} to='/summary-services' className={styles.dropdown_item}>
                <i className="fa fa-list-alt" style={{ marginRight: '10px' }}></i> Summary of services
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/mybookings' className={styles.dropdown_item}>
                <i className="fa fa-book" style={{ marginRight: '10px' }}></i> Bookings
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <NavLink to='/overview' className={`${styles.navbarItem} ${styles.notificationLink}`}>
              <i className="fa fa-file" style={{ marginRight: '10px' }}></i> Overview
          </NavLink> 

          <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
            >
              <i className="fa fa-screwdriver-wrench" style={{ marginRight: '10px' }}></i> My Services
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item as={NavLink} to='/services' className={styles.dropdown_item}>
                <i className="fa fa-list-ul" style={{ marginRight: '10px' }}></i> List of services offered
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/addservice' className={styles.dropdown_item}>
                <i className="fa fa-plus-circle" style={{ marginRight: '10px' }}></i> Add new services
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
            >
              <i className="fa fa-book" style={{ marginRight: '10px' }}></i> Manage Bookings
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item as={NavLink} to='/mybookings' className={styles.dropdown_item}>
                <i className="fa fa-list" style={{ marginRight: '10px' }}></i> Booking Requests
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/managerequests' className={styles.dropdown_item}>
                <i className="fa fa-clock" style={{ marginRight: '10px' }}></i> Pending Requests
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/confirmedbookings' className={styles.dropdown_item}>
                <i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i> Confirmed Bookings
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/completedbookings' className={styles.dropdown_item}>
                <i className="fa fa-check-square" style={{ marginRight: '10px' }}></i> Completed Bookings
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
            >
              <i className="fa fa-user" style={{ marginRight: '10px' }}></i> Manage Profile 
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item as={NavLink} to='/profile' className={styles.dropdown_item}>
                <i className="fa fa-user nav-icon" style={{ marginRight: '10px' }}></i> View Profile
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/accountsettings' className={styles.dropdown_item}>
                <i className="fa fa-cog" style={{ marginRight: '10px' }}></i> Account Settings
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/notifications' className={styles.dropdown_item}>
                <i className="fa fa-bell" style={{ marginRight: '10px' }}></i> Notifications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

           {/* <NavLink to='/notifications' className={`${styles.navbarItem} ${styles.notificationLink}`}>
        <i className="fa fa-bell" style={{ marginRight: '10px' }}></i> Notifications
      </NavLink> */}
        </nav>
      </div>
    </>
  );
};

export default Dashboard;