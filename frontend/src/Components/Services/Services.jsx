import React, { useEffect } from 'react';
import Cards from './Cards';
import Sdata from './Sdata';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Services.css'; 

const Services = () => {
  
  useEffect(() => {
    document.title = "Trusty Taskers - View Services";
  }, []);

  return (
    <div className="services-container">
      <Navbar />
      <h1 className='head_style'>List of top Services</h1>
      <div className="cards-container">
        {Sdata.map((val) => (
          <Cards 
            key={val.id} 
            imgsrc={val.imgsrc}
            title={val.title} 
            sname={val.sname}
            link={val.link}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Services;