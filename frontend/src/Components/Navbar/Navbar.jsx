// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';
// import logo from './logo1.jpeg';
// import './Navbar.css';
// import { storage } from '../Firebase/firebase';
// import { ref, getDownloadURL } from 'firebase/storage';

// const Navbar = () => {
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
//                         <NavLink className="item activeStyle" to='/'>
//                             <i className="fa fa-home nav-icon"></i>
//                             Home
//                         </NavLink>
//                         <NavLink className="item activeStyle" to="/about">
//                             <i className="fa fa-info-circle nav-icon"></i>
//                             About
//                         </NavLink>
//                         <NavLink className="item activeStyle" to="/contact">
//                             <i className="fa fa-phone nav-icon"></i>
//                             Contact Us
//                         </NavLink>
//                         <NavLink className="item activeStyle" to='/overview'>
//                             <i className="fa fa-chart-bar nav-icon"></i>
//                             Dashboard
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
//                                 <Dropdown.Item as={NavLink} to='/myservices'>
//                                     <i className="fa fa-screwdriver-wrench"></i>
//                                     My Services
//                                 </Dropdown.Item>
//                                 <Dropdown.Item as={NavLink} to='/services'>
//                                     <i className="fa fa-eye"></i>
//                                     View Services
//                                 </Dropdown.Item>
//                                 <Dropdown.Item as={NavLink} to='/addservice'>
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
//                                     <Dropdown.Item as={NavLink} to='/profile'>
//                                         <i className="fa fa-user nav-icon"></i>
//                                         View Profile
//                                     </Dropdown.Item>
//                                     <Dropdown.Item onClick={logout}>
//                                         <i className="fa fa-sign-out-alt nav-icon"></i>
//                                         Logout
//                                     </Dropdown.Item>
//                                     <Dropdown.Item as={NavLink} to='/addcard'>
//                                         Add Card
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

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from './logo1.jpeg';
import './Navbar.css';
import { storage } from '../Firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const auth = localStorage.getItem("loginusers");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('navbar');
    const [userImage, setUserImage] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    useEffect(() => {
        if (auth) {
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

        // Set the lang attribute on the html element
        document.documentElement.lang = i18n.language;

    }, [auth, i18n.language]);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleRobotIconClick = () => {
        navigate('/chatbot');
    };

    return (
        <>
            <nav className={i18n.language === 'ur' ? 'rtl' : ''}>
                <div className="nav">
                    <NavLink className="logo item inActiveStyle">
                        <NavLink to="/"><img src={logo} alt="My Logo" width="85" height="41" /></NavLink>
                    </NavLink>
                    <ul id="navbar" className={clicked ? "navbar active" : "navbar"}>
                        <NavLink className="item activeStyle" to='/'>
                            <i className="fa fa-home nav-icon"></i>
                            {t('home')}
                        </NavLink>
                        <Dropdown className="dropbtn" variant="link">
                            <Dropdown.Toggle
                                className="mainbtn"
                                style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
                            >
                                <i className="fa fa-info-circle nav-icon"></i>
                                {t('about')}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu-custom">
                                <Dropdown.Item as={NavLink} to='/about'>
                                    <i class="fa-solid fa-address-card nav-icon"></i>
                                    {t('aboutUs')}
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} to='/contact'>
                                    <i className="fa fa-phone nav-icon"></i>
                                    {t('contact')}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="dropbtn" variant="link">
                            <Dropdown.Toggle
                                className="mainbtn"
                                style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}
                            >
                                <i className="fa fa-cog nav-icon"></i>
                                {t('services')}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu-custom">
                                <Dropdown.Item as={NavLink} to='/myservices'>
                                    <i className="fa fa-screwdriver-wrench nav-icon"></i>
                                    {t('myServices')}
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} to='/services'>
                                    <i className="fa fa-eye nav-icon"></i>
                                    {t('viewServices')}
                                </Dropdown.Item>
                                <Dropdown.Item as={NavLink} to='/addservice'>
                                    <i className="fa fa-plus-circle nav-icon"></i>
                                    {t('addServices')}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <NavLink className="item activeStyle" to='/overview'>
                            <i className="fa fa-chart-bar nav-icon"></i>
                            {t('dashboard')}
                        </NavLink>
                    </ul>
                    {auth ? (
                        <>
                        <div className="right_side">
                            <div className="robot_icon" onClick={handleRobotIconClick}>
                                <i className='fas fa-robot robo_icon'></i>
                            </div>
                            <div className="profile-menu">
                                <Dropdown variant="link" id="dropdown-basic">
                                    <Dropdown.Toggle 
                                        className="mainbtn"
                                        style={{ backgroundColor: '#d01c28', color: 'white', border: 'none' }}>
                                        {userImage ? (
                                            <img src={userImage} alt="User Icon" width="30" height="30" style={{borderRadius: '50%' }} />
                                        ) : (
                                            <i className="fa fa-user user-icon"></i>
                                        )}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-custom">
                                        <Dropdown.Item as={NavLink} to='/profile'>
                                            <i className="fa fa-user nav-icon"></i>
                                            {t('viewProfile')}
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>
                                            <i className="fa fa-sign-out-alt nav-icon"></i>
                                            {t('logout')}
                                        </Dropdown.Item>
                                        <Dropdown.Item as={NavLink} to='/addcard'>
                                            {t('addCard')}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        </>
                    ) : (
                        <div className='both_btn'>
                            <NavLink className="item activeStyle" to="/login">
                                <i className="fa fa-user nav-icon"></i>
                                <button className="loginbtns">{t('login')}</button>
                            </NavLink>
                            <NavLink className="item activeStyle" to="/signup">
                                <i className="fa fa-user nav-icon"></i>
                                <button className="signbtns">{t('signup')}</button>
                            </NavLink>
                        </div>
                    )}
                </div>

                <div id="mobile" onClick={handleClick}>
                    <i className={clicked ? "fa fa-times menu-icon" : "fa fa-bars menu-icon"}></i>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
