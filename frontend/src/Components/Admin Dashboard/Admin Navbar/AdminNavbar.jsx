// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';
// import logo from './logo1.jpeg';
// import './AdminNavbar.css';
// import { storage } from '../../Firebase/firebase';
// import { ref, getDownloadURL } from 'firebase/storage';

// export const AdminNavbar = () => {
//     const auth = localStorage.getItem("loginusers");
//     const navigate = useNavigate();
//     const [userImage, setUserImage] = useState(null);
//     const [clicked, setClicked] = useState(false);

//     const handleClick = () => {
//         setClicked(!clicked);
//     };

//     useEffect(() => {
//         if (auth) {
//             console.log(auth);
//             const user = JSON.parse(auth);
//             if (user.profilePic) {
//                 const imageRef = ref(storage, user.profilePic);
//                 getDownloadURL(imageRef)
//                     .then((url) => {
//                         setUserImage(url);
//                     })
//                     .catch((error) => {
//                         console.error("Error fetching the image URL from Firebase Storage:", error);
//                     });
//             }
//         }
//     }, [auth]);

//     const logout = () => {
//         localStorage.clear();
//         navigate('/login');
//     };

//     return (
//         <>
//             <nav>
//                 <div className="nav">
//                     <NavLink className="logo item inActiveStyle">
//                         <NavLink to="/"><img src={logo} alt="My Logo" width="85" height="41" /></NavLink>
//                     </NavLink>
//                     <ul id="navbar" className={clicked ? "navbar active" : "navbar"}>
//                         <NavLink className="item activeStyle" to='/adminoverview'>
//                             <i className="fa fa-file nav-icon"></i>
//                             Overview
//                         </NavLink>
//                         <NavLink className="item activeStyle" to="/usersaccounts">
//                             <i className="fa fa-users nav-icon"></i>
//                             Accounts
//                         </NavLink>
//                         <NavLink className="item activeStyle" to="/paymenthistory">
//                             <i className="fa fa-wallet nav-icon"></i>
//                             Payments
//                         </NavLink>
//                         <NavLink className="item activeStyle" to="/allbookings">
//                             <i className="fa fa-book nav-icon"></i>
//                             Bookings
//                         </NavLink>

//                         <Dropdown className="dropbtn" variant="link">
//                             <Dropdown.Toggle
//                                 className="mainbtn"
//                                 style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
//                             >
//                                 <i className="fa fa-cog nav-icon"></i>
//                                 Services
//                             </Dropdown.Toggle> 

//                             <Dropdown.Menu className="dropdown-menu-custom">
//                                 <Dropdown.Item as={NavLink} to='/allservices'>
//                                     <i className="fa fa-eye"></i>
//                                     View Services
//                                 </Dropdown.Item>
//                                 <Dropdown.Item as={NavLink} to='/addnewservice'>
//                                     <i className="fa fa-plus-circle"></i>
//                                     Add Services
//                                 </Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </ul>
//                     {auth ? (
//                         <div className="profile-menu">
//                             <Dropdown variant="link" id="dropdown-basic">
//                                 <Dropdown.Toggle 
//                                     className="mainbtn"
//                                     style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}>
//                                     {userImage ? (
//                                         <img src={userImage} alt="User Icon" width="30" height="30" style={{borderRadius: '50%' }} />
//                                     ) : (
//                                         <i className="fa fa-user user-icon"></i>
//                                     )}
//                                 </Dropdown.Toggle>
//                                 <Dropdown.Menu className="dropdown-menu-custom">
//                                     <Dropdown.Item as={NavLink} to='/adminprofile'>
//                                         <i className="fa fa-user nav-icon"></i>
//                                         View Profile
//                                     </Dropdown.Item>
//                                     <Dropdown.Item onClick={logout}>
//                                         <i className="fa fa-sign-out-alt nav-icon"></i>
//                                         Logout
//                                     </Dropdown.Item>
//                                 </Dropdown.Menu>
//                             </Dropdown>
//                         </div>
//                     ) : (
//                         <div className='both_btn'>
//                             <NavLink className="item activeStyle" to="/login">
//                                 <i className="fa fa-user nav-icon"></i>
//                                 <button className="loginbtns">Log in</button>
//                             </NavLink>
//                             <NavLink className="item activeStyle" to="/signup">
//                                 <i className="fa fa-user nav-icon"></i>
//                                 <button className="signbtns">Sign up</button>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 <div id="mobile" onClick={handleClick}>
//                     <i className={clicked ? "fa fa-times menu-icon" : "fa fa-bars menu-icon"}></i>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default AdminNavbar;



import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from './logo1.jpeg';
import styles from './AdminNavbar.module.css';
import { storage } from '../../Firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

export const AdminNavbar = () => {
    const auth = localStorage.getItem("loginusers");
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    useEffect(() => {
        if (auth) {
            console.log(auth);
            const user = JSON.parse(auth);
            if (user.profilePic) {
                const imageRef = ref(storage, user.profilePic);
                getDownloadURL(imageRef)
                    .then((url) => {
                        setUserImage(url);
                    })
                    .catch((error) => {
                        console.error("Error fetching the image URL from Firebase Storage:", error);
                    });
            }
        }
    }, [auth]);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.nav}>
                    <NavLink className={`${styles.logo} ${styles.item} ${styles.inActiveStyle}`} to="/">
                        <img src={logo} alt="My Logo" width="85" height="41" />
                    </NavLink>
                    <ul id={styles.navbar} className={clicked ? `${styles.navbar} ${styles.active}` : styles.navbar}>
                        <NavLink className={`${styles.item} ${styles.activeStyle}`} to='/adminoverview'>
                            <i className="fa fa-file nav-icon"></i>
                            Overview
                        </NavLink>
                        <NavLink className={`${styles.item} ${styles.activeStyle}`} to="/usersaccounts">
                            <i className="fa fa-users nav-icon"></i>
                            Accounts
                        </NavLink>
                        <NavLink className={`${styles.item} ${styles.activeStyle}`} to="/paymenthistory">
                            <i className="fa fa-wallet nav-icon"></i>
                            Payments
                        </NavLink>
                        <NavLink className={`${styles.item} ${styles.activeStyle}`} to="/allbookings">
                            <i className="fa fa-book nav-icon"></i>
                            Bookings
                        </NavLink>

                        <Dropdown className={styles.dropbtn} variant="link">
                            <Dropdown.Toggle
                                className={styles.mainbtn}
                                style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
                            >
                                <i className="fa fa-cog nav-icon"></i>
                                Services
                            </Dropdown.Toggle> 

                            <Dropdown.Menu className={styles['dropdown-menu-custom']}>
                                <Dropdown.Item as={NavLink} to='/allservices'>
                                    <i className="fa fa-eye"></i>
                                    View Services
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} to='/addnewservice'>
                                    <i className="fa fa-plus-circle"></i>
                                    Add Services
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                    {auth ? (
                        <div className={styles['profile-menu']}>
                            <Dropdown variant="link" id="dropdown-basic">
                                <Dropdown.Toggle 
                                    className={styles.mainbtn}
                                    style={{ backgroundColor: '#d01c28', color: 'white', border: 'none', marginRight: "5px" }}>
                                    {userImage ? (
                                        <img src={userImage} alt="User Icon" width="30" height="30" style={{borderRadius: '50%' }} />
                                    ) : (
                                        <i className="fa fa-user user-icon"></i>
                                    )}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles['dropdown-menu-custom']}>
                                    <Dropdown.Item as={NavLink} to='/adminprofile'>
                                        <i className="fa fa-user nav-icon"></i>
                                        View Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>
                                        <i className="fa fa-sign-out-alt nav-icon"></i>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className={styles.both_btn}>
                            <NavLink className={`${styles.item} ${styles.activeStyle}`} to="/login">
                                <i className="fa fa-user nav-icon"></i>
                                <button className={styles.loginbtns}>Log in</button>
                            </NavLink>
                            <NavLink className={`${styles.item} ${styles.activeStyle}`} to="/signup">
                                <i className="fa fa-user nav-icon"></i>
                                <button className={styles.signbtns}>Sign up</button>
                            </NavLink>
                        </div>
                    )}
                </div>

                <div id={styles.mobile} onClick={handleClick}>
                    <i className={clicked ? "fa fa-times menu-icon" : "fa fa-bars menu-icon"}></i>
                </div>
            </nav>
        </>
    );
};

export default AdminNavbar;
