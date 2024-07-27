import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ContactHeader from "../ContactHeader/ContactHeader";
import ContactForm from "../ContactForm/ContactForm";
import Footer from "../Footer/Footer";
import ChatBox from "../ChatBox/ChatBox";
import TranslateButton from "../TranslateButton/TranslateButton";

export default function ContactUs() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("loginusers");
    if (!auth) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "Trusty Taskers - Contact Us";
  }, []);

  return (
    <>
      <Navbar />
      <TranslateButton />
      <ContactHeader />
      <ContactForm />
      <ChatBox />
      <Footer />
    </>
  );
}
