// import React, { useState, useEffect, useRef } from "react";
// import { useTranslation } from 'react-i18next';

// const TranslateButton = () => {
//   const { t, i18n } = useTranslation();
//   const [showTranslatePanel, setShowTranslatePanel] = useState(false);
//   const panelRef = useRef(null);

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     setShowTranslatePanel(false); 
//   };

//   const toggleTranslatePanel = () => {
//     setShowTranslatePanel(!showTranslatePanel);
//   };

//   const handleClickOutside = (event) => {
//     if (panelRef.current && !panelRef.current.contains(event.target)) {
//       setShowTranslatePanel(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="translate-button" ref={panelRef}>
//       <button className="translate-icon" onClick={toggleTranslatePanel}>
//         <i className="fa fa-language" aria-hidden="true"></i> 
//       </button>
//       {showTranslatePanel && (
//         <div className="translate-panel">
//           <button onClick={() => changeLanguage(i18n.language === 'en' ? 'ur' : 'en')}>
//             {t('translate')}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TranslateButton;

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

const TranslateButton = () => {
  const { i18n } = useTranslation();
  const [showTranslatePanel, setShowTranslatePanel] = useState(false);
  const panelRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowTranslatePanel(false); 
  };

  const toggleTranslatePanel = () => {
    setShowTranslatePanel(!showTranslatePanel);
  };

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setShowTranslatePanel(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="translate-button" ref={panelRef}>
      <button className="translate-icon" onClick={toggleTranslatePanel}>
        <i className="fa fa-language" aria-hidden="true"></i> 
      </button>
      {showTranslatePanel && (
        <div className="translate-panel">
          <button className="ur_eng" onClick={() => changeLanguage(i18n.language === 'en' ? 'ur' : 'en')}>
            {i18n.language === 'en' ? 'اردو' : 'English'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TranslateButton;
