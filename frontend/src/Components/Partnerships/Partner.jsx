// src/Partner.js
import React from 'react';

const Partner = ({ partner }) => {
 return (
    <div className="partner">
      <img src={partner.logo} alt={partner.name} height='200px' width='300px'/>
      <h3>{partner.name}</h3>
      <p>{partner.description}</p>
      <a href={partner.link} target='_blank' rel="noreferrer">
                <button className='card_btn'>Check it out</button>
              </a>
    </div>
 );
};

export default Partner;
