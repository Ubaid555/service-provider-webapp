// // src/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// // import Backend from 'i18next-http-backend';
// // import LanguageDetector from 'i18next-browser-languagedetector';

// import translationEN from './locales/en/translation.json';
// import translationUR from './locales/ur/translation.json';
// import translationAboutUsEN from './locales/en/translationAboutUs.json';
// import translationAboutUsUR from './locales/ur/translationAboutUs.json';

// const resources = {
//   en: {
//     translation: translationEN,
//     translate: translationAboutUsEN,
//   },
//   ur: {
//     translation: translationUR,
//     translate: translationAboutUsUR,
//   },
// };

// i18n
//   // .use(Backend)
//   // .use(LanguageDetector)
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: 'en', // default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//     // backend: {
//     //   loadPath: '/locales/{{lng}}/translationAboutUs.json',
//     // },
//   });

// export default i18n;


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

const resources = {
  en: {
    translation: translationEN,
    aboutUs: translationAboutUsEN,
    contactUs: translationContactUsEN,
    navbar: translationNavbarEN
  },
  ur: {
    translation: translationUR,
    aboutUs: translationAboutUsUR,
    contactUs:  translationContactUsUR,
    navbar: translationNavbarUR
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
