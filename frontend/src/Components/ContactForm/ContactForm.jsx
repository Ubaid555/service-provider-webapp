// import React, { useRef, useState } from "react";
// import Button from "../Button/Button";
// import styles from "./ContactForm.module.css";
// import { MdMessage } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
// import { HiMail } from "react-icons/hi";
// import emailjs from "@emailjs/browser"; 
// import ContactSuccessModal from "../AllModals/ContactSuccessModal/ContactSuccessModal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ContactForm = () => {
//   const form = useRef();
//   const [showModal, setShowModal] = useState(false);

//   const sendEmail = (e) => {
//     e.preventDefault();
//     const formData = new FormData(form.current);
//     const name = formData.get("from_name");
//     const email = formData.get("from_email");
//     const message = formData.get("message");

//     if (!name && !email && !message) {
//       toast.error("Please fill the form to proceed");
//       return;
//     }

//     if (!name || !email || !message) {
//       if (!name) {
//         toast.error("Please enter your name");
//         return;
//       }
//       if (!email) {
//         toast.error("Please enter your email");
//         return;
//       }
//       if (!message) {
//         toast.error("Please enter your message");
//         return;
//       }
//     }

//     emailjs
//       .sendForm("service_pdyblha", "template_wpc67qv", form.current, {
//         publicKey: "9ujRgBQpguItLcAb0",
//       })
//       .then(
//         () => {
//           setShowModal(true);
//           form.current.reset();
//         },
//         (error) => {
//           console.log("FAILED...", error.text);
//         }
//       );
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <section className={styles.container}>
//         <div className={styles.contact_form}>
//           <div className={styles.top_btn}>
//             <Button text="Via Support Chat" icon={<MdMessage fontSize="24px" />} />
//             <Button text="Via Email Form" icon={<HiMail fontSize="24px" />} />
//           </div>
//           <Button text="Via Phone" icon={<FaPhoneAlt fontSize="24px" />} />

//           <form ref={form} className={styles.C_form} onSubmit={sendEmail}>
//             <div className={styles.form_control}>
//               <label htmlFor="name">Name</label>
//               <input type="text" name="from_name" />
//             </div>
//             <div className={styles.form_control}>
//               <label htmlFor="email">Email</label>
//               <input type="email" name="from_email" />
//             </div>
//             <div className={styles.form_control}>
//               <label htmlFor="message">Message</label>
//               <textarea name="message" rows="8" />
//             </div>
//             <div style={{ display: "flex", justifyContent: "end" }}>
//               <Button text="Submit Now" />
//             </div>
//           </form>
//         </div>
//         <div className={styles.contact_image}>
//           <img src="/Images/Service.png" alt="contact-img" />
//         </div>
//       </section>

//       {showModal && <ContactSuccessModal show={showModal} onClose={handleCloseModal} />}
//       <ToastContainer />
//     </>
//   );
// };

// export default ContactForm;


import React, { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from "../Button/Button";
import styles from "./ContactForm.module.css";
import { MdMessage } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import emailjs from "@emailjs/browser"; 
import ContactSuccessModal from "../AllModals/ContactSuccessModal/ContactSuccessModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const { t, i18n } = useTranslation('contactUs');
  const form = useRef();
  const [showModal, setShowModal] = useState(false);
  const direction = i18n.language === 'ur' ? 'rtl' : 'ltr';

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const name = formData.get("from_name");
    const email = formData.get("from_email");
    const message = formData.get("message");

    if (!name && !email && !message) {
      toast.error(t('fillFormError'));
      return;
    }

    if (!name || !email || !message) {
      if (!name) {
        toast.error(t('enterNameError'));
        return;
      }
      if (!email) {
        toast.error(t('enterEmailError'));
        return;
      }
      if (!message) {
        toast.error(t('enterMessageError'));
        return;
      }
    }

    emailjs
      .sendForm("service_pdyblha", "template_wpc67qv", form.current, {
        publicKey: "9ujRgBQpguItLcAb0",
      })
      .then(
        () => {
          setShowModal(true);
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.container} dir={direction}>
        <div className={styles.contact_form}>
          <div className={styles.top_btn}>
            <Button text={t('viaSupportChat')} icon={<MdMessage fontSize="24px" />} />
            <Button text={t('viaEmailForm')} icon={<HiMail fontSize="24px" />} />
          </div>
          <Button text={t('viaSupportChat')} icon={<MdMessage fontSize="24px" />} />

          <form ref={form} className={styles.C_form} onSubmit={sendEmail}>
            <div className={styles.form_control}>
              <label htmlFor="name">{t('nameLabel')}</label>
              <input type="text" name="from_name" />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="email">{t('emailLabel')}</label>
              <input type="email" name="from_email" />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="message">{t('messageLabel')}</label>
              <textarea name="message" rows="8" />
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button text={t('submitButton')} />
            </div>
          </form>
        </div>
        <div className={styles.contact_image}>
          <img src="/Images/Service.png" alt="contact-img" />
        </div>
      </section>

      {showModal && <ContactSuccessModal show={showModal} onClose={handleCloseModal} />}
      <ToastContainer />
    </>
  );
};

export default ContactForm;
