import "./Footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t, i18n } = useTranslation("footer");
  const isRtl = i18n.language === "ur";

  return (
    <>
      <div className={`footer ${isRtl ? "rtl" : ""}`}>
        <div className="OutLinks">
          <h3>{t("importantLinks")}</h3>
          <ul>
            <Link to="/about">{t("missionAndVision")}</Link>
          </ul>
          <ul>
            <Link to="/about">{t("aboutUs")}</Link>
          </ul>
          <ul>
            <Link to="/contact">{t("contactUs")}</Link>
          </ul>
          <ul>
            <Link to="/services">{t("services")}</Link>
          </ul>
          <ul>
            <Link to="/partnerships">{t("partnerships")}</Link>
          </ul>
        </div>

        <div className="Helplines">
          <h3>{t("supportLocation")}</h3>
          <ul>
            <Link to={"mailto:awanhanzala6@gmail.com"}>{t("email")}</Link>
          </ul>
          <ul>{t("hr")}</ul>
          <ul>{t("marketing")}</ul>
          <ul>{t("finance")}</ul>
          <ul>
            <Link to="/about">{t("visitOffice")}</Link>
          </ul>
        </div>

        <div className="InLinks">
          <h3>{t("services")}</h3>
          <ul>
            <Link to="/services">{t("electrician")}</Link>
          </ul>
          <ul>
            <Link to="/services">{t("carpenter")}</Link>
          </ul>
          <ul>
            <Link to="/services">{t("mechanic")}</Link>
          </ul>
          <ul>
            <Link to="/services">{t("plumber")}</Link>
          </ul>
          <ul>
            <Link to="/services">{t("labor")}</Link>
          </ul>
        </div>

        <div className="trademark">
          <h3>
            <Link to="/">{t("trustyTaskers")}</Link>
          </h3>
          <p className="para">{t("footerText")}</p>

          <div className="social-media">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=03029428807"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
