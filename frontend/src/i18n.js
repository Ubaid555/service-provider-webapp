import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationUR from './locales/ur/translation.json';
import translationAboutUsEN from './locales/en/translationAboutUs.json';
import translationAboutUsUR from './locales/ur/translationAboutUs.json';
import translationContactUsEN from './locales/en/translationContactUs.json';
import translationContactUsUR from './locales/ur/translationContactUs.json';
import translationNavbarEN from './locales/en/translationNavbar.json';
import translationNavbarUR from './locales/ur/translationNavbar.json';
import translationFooterEN from './locales/en/translationFooter.json';
import translationFooterUR from './locales/ur/translationFooter.json';
import translationDashboardEN from './locales/en/translationDashboard.json';
import translationDashboardUR from './locales/ur/translationDashboard.json';
import translationOverviewEN from './locales/en/translationOverview.json';
import translationOverviewUR from './locales/ur/translationOverview.json';
import translationLoginEN from './locales/ur/translationLogin.json';
import translationLoginUR from './locales/ur/translationLogin.json';
import translationSignupEN from './locales/ur/translationSignup.json';
import translationSignupUR from './locales/ur/translationSignup.json';



const resources = {
  en: {
    translation: translationEN,
    aboutUs: translationAboutUsEN,
    contactUs: translationContactUsEN,
    navbar: translationNavbarEN,
    footer: translationFooterEN,
    dashboard: translationDashboardEN,
    overview: translationOverviewEN,
    login: translationLoginEN,
    signup: translationSignupEN
  },
  ur: {
    translation: translationUR,
    aboutUs: translationAboutUsUR,
    contactUs: translationContactUsUR,
    navbar: translationNavbarUR,
    footer: translationFooterUR,
    dashboard: translationDashboardUR,
    overview: translationOverviewUR,
    login: translationLoginUR,
    signup: translationSignupUR
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
