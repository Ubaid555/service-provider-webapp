import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./AboutHeader.css";

export const AboutHeader = () => {
  const { t } = useTranslation("aboutUs");

  useEffect(() => {
    document.title = "Trusty Taskers - About";
  }, []);

  return (
    <>
      <main className="whole_sec">
        <div className="about_img">
          <img
            className="about"
            src="/Images/about_us.png"
            alt="about img"
            height="500px"
            width="530px"
          />
        </div>

        <div className="paras">
          <div className="para1">
            <h4>{t("aboutUs.about")}</h4>
            <p>{t("aboutUs.aboutText")}</p>
          </div>

          <div className="para2">
            <h4>{t("aboutUs.mission")}</h4>
            <p>{t("aboutUs.missionText")}</p>
          </div>
        </div>
      </main>
    </>
  );
};
