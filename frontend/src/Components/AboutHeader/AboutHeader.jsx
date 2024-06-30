/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useEffect } from 'react';
import './AboutHeader.css';

export const AboutHeader = () => {
    useEffect(() => {
        document.title = "Trusty Taskers - About";
      }, []);
  return (
    <>
    <main className="whole_sec">
        <div className='about_img'>
            <img className='about' src='/Images/about_us.png' alt="about image" height="500px" width="530px"/>
        </div>

        <div className='paras'>
            <div className="para1">
                <h4>About Us</h4>
                <p>At Trusty Taskers, we understand the importance of reliable and efficient services when it 
                    comes to everyday tasks around your home or workplace. With a commitment to excellence and a 
                    passion for customer satisfaction, we strive to connect you with skilled professionals who 
                    can address your needs promptly and effectively.</p>
            </div>

            <div className="para2">
                <h4>Our Mission</h4>
                <p>Starting a mission to help you. Finding solutions to your problems. Making your life easier. 
                    We're here for you. Building trust and making things better. Giving you the service you deserve.
                </p>
            </div>
        </div>
    </main>
    </>
  )
}
