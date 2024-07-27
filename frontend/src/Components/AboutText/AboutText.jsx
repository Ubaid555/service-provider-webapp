import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./AboutText.css";

export const AboutText = () => {
  const { t } = useTranslation("aboutUs");
  const message = t("aboutText.message");

  return (
    <section className="section-white">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="section-title">{t("team.teamTitle")}</h2>

            <p className="section-subtitle">{message}</p>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img
                className="team-img"
                src="Images/Team member 1.jpeg"
                alt="img1"
              />
              <h3>{t("team.ubaidTitle")}</h3>
              <div className="team-info">
                <p>{t("team.ubaidRole")}</p>
                <p>{t("team.ubaidDescription")}</p>

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
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img
                className="team-img"
                src="Images/Team member 2.jpg"
                alt="img1"
              />
              <h3>{t("team.hanzalaTitle")}</h3>
              <div className="team-info">
                <p>{t("team.hanzalaRole")}</p>
                <p>{t("team.hanzalaDescription")}</p>

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
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img
                className="team-img"
                src="Images/Team member 3.jpeg"
                alt="img1"
              />
              <h3>{t("team.talhaTitle")}</h3>
              <div className="team-info">
                <p>{t("team.talhaRole")}</p>
                <p>{t("team.talhaDescription")}</p>

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
          </div>
        </div>
      </div>
    </section>
  );
};
