import React from "react";
import { NavLink } from "react-router-dom";
import "./Cards.css";

function Card(props){
    return(
    <>
      <div className='cards'>
        <div className='card'>
          <img src={props.imgsrc} alt='myPic' className='card_img'/>
          <div className='card_info'>
              <span className='card_category'>{props.title}</span>
              <h3 className='card_title'>{props.sname}</h3>
        
              <NavLink to={`/allusers?category=${props.sname}`}>
                <button className='card_btn'>View More</button>
              </NavLink>
          </div>
        </div>
      </div>
    </>
    );
  }
export default Card;