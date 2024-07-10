// import styles from "./ContactHeader.module.css";
// const ContactHeader = () => {
//   return (
//     <div className={`${styles.contact_section}`}>
//       <h1>CONTACT US</h1>
//       <p>
//         Let’s connect: we’re here to help, and we’d love to hear from you!
//         whether you have a question, comment, or just want to chat , you can
//         reach out to us through the contact form of this page, or by phone,
//         email, or social media.{" "}
//       </p>
//     </div>
//   );
// };

// export default ContactHeader;


import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./ContactHeader.module.css";

const ContactHeader = () => {
  const { t, i18n } = useTranslation('contactUs');
  const direction = i18n.language === 'ur' ? 'rtl' : 'ltr';

  return (
    <div className={`${styles.contact_section}`} dir={direction}>
      <h1>{t('header')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default ContactHeader;

