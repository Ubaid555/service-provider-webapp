import React from 'react'
import './AboutAddress.css';

export default function AboutAddress() {
  return (
    <div>
        <address className='address'>
            Sector I/8-3 Street 57, Islamabad
        </address>

        <div className='responsive-map'>
        <iframe title="Google Maps Embed" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.4772626862105!
        2d73.06873157554351!3d33.670704173302966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df955b4b6580
        cf%3A0x8ff6f8f3d6dc3f7!2sStreet%2057%2C%20I-8%2F3%20I%208%2F2%20I-8%2C%20Islamabad%2C%20Islamabad%20Capital%20
        Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1708492106800!5m2!1sen!2s" width="1690" height="300" style={{ border: 0 }} 
        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}
