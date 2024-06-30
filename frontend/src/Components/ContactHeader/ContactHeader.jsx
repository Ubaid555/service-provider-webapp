import styles from "./ContactHeader.module.css";
const ContactHeader = () => {
  return (
    <div className={`${styles.contact_section}`}>
      <h1>CONTACT US</h1>
      <p>
        Let’s connect: we’re here to help, and we’d love to hear from you!
        whether you have a question, comment, or just want to chat , you can
        reach out to us through the contact form of this page, or by phone,
        email, or social media.{" "}
      </p>
    </div>
  );
};

export default ContactHeader;