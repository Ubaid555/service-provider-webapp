import React from 'react';
import { Link } from "react-router-dom";
import './AboutText.css';

export const AboutText = () => {
    let message="Cultivating trust through exceptional service and reliable professionals, Trusty Taskers stands as your trusted partner for seamless solutions and exceptional service delivery. With a commitment to excellence and a passion for customer satisfaction, we strive to exceed your expectations at every turn.";
  return (
    <section className='section-white'>
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
            <h2 className='section-title'>
                The team behind Trusty Taskers
            </h2>

            <p className='section-subtitle'>{message}</p>
        </div>
        
        <div className="col-sm-6 col-md-4">
            <div className="team-item">
                <img className='team-img' src='Images/Team member 1.jpeg' alt='img1'/>
                <h3>Muhammad Ubaid</h3>
                <div className="team-info">
                    <p>Head  and CEO of the Trusty Taskers</p>
                    <p>Meet our pioneering CEO, Head and CEO of Trusty Ventures, leading us to new horizons with 
                        vision, ensuring top-notch leadership every step of the way!</p>

                    <div className="social-media">
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></Link>
                        <a href="https://api.whatsapp.com/send?phone=03029428807" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-sm-6 col-md-4">
            <div className="team-item">
                <img className='team-img' src='Images/Team member 2.jpg' alt='img1'/>
                <h3>Hanzala Javaid</h3>
                <div className="team-info">
                    <p>Marketing Manager of Trusty Taskers</p>
                    <p>Meet our marketing maestro, the Manager of Trusty Marketing, guiding us to new markets 
                        with expertise, ensuring top-notch strategies every step!</p>

                    <div className="social-media">
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></Link>
                        <a href="https://api.whatsapp.com/send?phone=03029428807" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-sm-6 col-md-4">
            <div className="team-item">
                <img className='team-img' src='Images/Team member 3.jpeg' alt='img1'/>
                <h3>Talha Khan</h3>
                <div className="team-info">
                    <p>Finance Manager of Trusty Taskers</p>
                    <p>Meet our fiscal steward, the Manager of Trusty Finance, navigating us to fiscal success with 
                        dedication, ensuring top-notch management every step!</p>

                    <div className="social-media">
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></Link>
                        <a href="https://api.whatsapp.com/send?phone=03029428807" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    </section>
  );
};
