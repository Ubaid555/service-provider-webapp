// AboutUs.js

import React from 'react';
import { AboutText } from '../AboutText/AboutText';
import './AboutUs.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { AboutHeader } from '../AboutHeader/AboutHeader';
import AboutAddress from '../About Address/AboutAddress';

export const AboutUs = () => {
  return (
    <div className="about-us">
      <Navbar/>
      <AboutHeader/>
      <AboutText/>
      <AboutAddress/>
      <Footer/>
    </div>
  );
};
