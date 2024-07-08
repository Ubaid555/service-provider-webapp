import React, { useEffect, useState } from 'react';
import Cards from './Cards';
//import Sdata from './Sdata';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Services.css'; 
import ChatBox from '../ChatBox/ChatBox';

const Services = () => {
  const [Sdata,setSdata]=useState([]);
  
  useEffect(() => {
    document.title = "Trusty Taskers - View Services";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/services/service`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const result = await response.json();
        console.log("In Service.jsx",result)
        setSdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="services-container">
      <Navbar />
      <h1 className='head_style'>List of top Services</h1>
      <div className="cards-container">
      {Sdata.length > 0 ? (
  Sdata.map((val) => (
    <Cards 
      key={val.id} 
      imgsrc={val.imgsrc}
      title={val.title} 
      sname={val.sname}
      link={val.link}
    />
  ))
) : (
  <p>No Services Found</p>
)}
      </div>
      <ChatBox/>
      <Footer />
    </div>
  );
};

export default Services;