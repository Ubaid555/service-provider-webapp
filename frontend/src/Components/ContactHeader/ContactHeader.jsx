import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ContactHeader.module.css";

const ContactHeader = () => {
  const { t, i18n } = useTranslation("contactUs");
  const direction = i18n.language === "ur" ? "rtl" : "ltr";

  return (
    <div className={`${styles.contact_section}`} dir={direction}>
      <h1>{t("header")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default ContactHeader;
