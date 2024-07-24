import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './Dashboard.module.css';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { t, i18n } = useTranslation('dashboard');

  const currentLanguage = i18n.language;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    document.title = t('title');
  }, [i18n.language, t]);

  return (
    <>
      <Navbar />
      <div dir={currentLanguage === 'ur' ? 'rtl' : 'ltr'} className={styles.dashboard}>
        <nav className={`${styles.navbar} ${showMenu ? styles.showMenu : ''}`}>
          {/* Toggle button for small screens */}
          <button className={`${styles.menuButton} ${showMenu ? styles.closeButton : ''}`} onClick={toggleMenu}>
            {showMenu ? (
              <>
                <i className="fa fa-times ico" style={{ marginRight: '10px' }}></i> {t('close')}
              </>
            ) : (
              <>
                <i className="fa fa-bars ico" style={{ marginRight: '10px' }}></i> {t('dashboardMenu')}
              </>
            )}
          </button>

          {/* <NavLink to='/overview' className={`${styles.navbarItem} ${styles.notificationLink}`}>
            <i className="fa fa-file over" style={{ marginRight: '10px' }}></i> {t('overview')}
          </NavLink>  */}

          {/* <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
            >
              <i className="fa fa-screwdriver-wrench" style={{ marginRight: '10px' }}></i> {t('myServices')}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item as={NavLink} to='/services' className={styles.dropdown_item}>
                <i className="fa fa-list-ul" style={{ marginRight: '10px' }}></i> {t('listOfServices')}
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/addservice' className={styles.dropdown_item}>
                <i className="fa fa-plus-circle" style={{ marginRight: '10px' }}></i> {t('addNewServices')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
            >
              <i className="fa fa-book" style={{ marginRight: '10px' }}></i> {t('manageBookings')}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item as={NavLink} to='/mybookings' className={styles.dropdown_item}>
                <i className="fa fa-list" style={{ marginRight: '10px' }}></i> {t('bookingRequests')}
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/managerequests' className={styles.dropdown_item}>
                <i className="fa fa-clock" style={{ marginRight: '10px' }}></i> {t('pendingRequests')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* <Dropdown className={styles.dropbtn} variant="link">
            <Dropdown.Toggle
              className={styles.mainbtn}
              style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
            >
              <i className="fa fa-user" style={{ marginRight: '10px' }}></i> {t('manageProfile')}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenuCustom}>
              <Dropdown.Item as={NavLink} to='/profile' className={styles.dropdown_item}>
                <i className="fa fa-user nav-icon" style={{ marginRight: '10px' }}></i> {t('viewProfile')}
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/accountsettings' className={styles.dropdown_item}>
                <i className="fa fa-cog" style={{ marginRight: '10px' }}></i> {t('accountSettings')}
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/notifications' className={styles.dropdown_item}>
                <i className="fa fa-bell" style={{ marginRight: '10px' }}></i> {t('notifications')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </nav>
      </div>
    </>
  );
};

export default Dashboard;
