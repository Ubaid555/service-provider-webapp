// import "./Footer.css";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <>
//       <div className="footer">
//         <div className="OutLinks">
//           <h3>IMPORTANT LINKS:</h3>
//           <ul><Link to='/about'>Mission and Vision</Link></ul>
//           <ul><Link to='/about'>About Us</Link></ul>
//           <ul><Link to='/contact'>Contact Us</Link></ul>
//           <ul><Link to='/services'>Services</Link></ul>
//           <ul><Link to='/partnerships'>Partnerships</Link></ul>
//         </div>

//         <div className="Helplines">
//           <h3>SUPPORT - LOCATION:</h3>
//           <ul><Link to={"mailto:awanhanzala6@gmail.com"}>Email: awanhanzala6@gmail.com</Link></ul>
//           <ul>HR: 0305 5630369</ul>
//           <ul>Marketing: 0302 9428807</ul>
//           <ul>Finance: 0344 0099627</ul>
//           <ul><Link to='/about'>Visit Our Office</Link></ul>
//         </div>

//         <div className="InLinks">
//           <h3>SERVICES:</h3>
//           <ul><Link to='/services'>Electrician</Link></ul>
//           <ul><Link to='/services'>Carpenter</Link></ul>
//           <ul><Link to='/services'>Mechanic</Link></ul>
//           <ul><Link to='/services'>Plumber</Link></ul>
//           <ul><Link to='/services'>Labor</Link></ul>
//         </div>

//         <div className="trademark">
//           <h3><Link to="/">Trusty Taskers</Link></h3>
//           <p className="para">
//             &copy;2024 All Rights Reserved, Trusty Taskers - Connecting Needs, Building Dreams
//           </p>
          
//           <div className="social-media">
//               <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></Link>
//               <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></Link>
//               <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></Link>
//               <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></Link>
//               <a href="https://api.whatsapp.com/send?phone=03029428807" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
//           </div>  
//         </div>
//       </div>
//     </>
//   );
// }
// export default Footer;

import "./Footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t, i18n } = useTranslation('footer');
  const isRtl = i18n.language === 'ur'; // Check if the current language is Urdu

  return (
    <>
      <div className={`footer ${isRtl ? 'rtl' : ''}`}>
        <div className="OutLinks">
          <h3>{t('importantLinks')}</h3>
          <ul><Link to='/about'>{t('missionAndVision')}</Link></ul>
          <ul><Link to='/about'>{t('aboutUs')}</Link></ul>
          <ul><Link to='/contact'>{t('contactUs')}</Link></ul>
          <ul><Link to='/services'>{t('services')}</Link></ul>
          <ul><Link to='/partnerships'>{t('partnerships')}</Link></ul>
        </div>

        <div className="Helplines">
          <h3>{t('supportLocation')}</h3>
          <ul><Link to={"mailto:awanhanzala6@gmail.com"}>{t('email')}</Link></ul>
          <ul>{t('hr')}</ul>
          <ul>{t('marketing')}</ul>
          <ul>{t('finance')}</ul>
          <ul><Link to='/about'>{t('visitOffice')}</Link></ul>
        </div>

        <div className="InLinks">
          <h3>{t('services')}</h3>
          <ul><Link to='/services'>{t('electrician')}</Link></ul>
          <ul><Link to='/services'>{t('carpenter')}</Link></ul>
          <ul><Link to='/services'>{t('mechanic')}</Link></ul>
          <ul><Link to='/services'>{t('plumber')}</Link></ul>
          <ul><Link to='/services'>{t('labor')}</Link></ul>
        </div>

        <div className="trademark">
          <h3><Link to="/">{t('trustyTaskers')}</Link></h3>
          <p className="para">
            {t('footerText')}
          </p>
          
          <div className="social-media">
              <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></Link>
              <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></Link>
              <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></Link>
              <Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></Link>
              <a href="https://api.whatsapp.com/send?phone=03029428807" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
          </div>  
        </div>
      </div>
    </>
  );
}
export default Footer;
