import React from 'react';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar'
import ContactHeader from '../ContactHeader/ContactHeader'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'

export default function ContactUs() {
  useEffect(() => {
    document.title = "Trusty Taskers - Contact Us";
  }, []);
  return (
    <>
        <Navbar/>
        <ContactHeader/>
        <ContactForm/>
        <Footer/>
    </>
  )
}
