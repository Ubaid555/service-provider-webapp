import React from 'react';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import ContactHeader from '../ContactHeader/ContactHeader'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import ChatBox from '../ChatBox/ChatBox';

export default function ContactUs() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("loginusers");
    if (!auth) {
        navigate('/login');
    }
}, [navigate]);

  useEffect(() => {
    document.title = "Trusty Taskers - Contact Us";
  }, []);
  return (
    <>
        <Navbar/>
        <ContactHeader/>
        <ContactForm/>
        <ChatBox/>
        <Footer/>
    </>
  )
}
