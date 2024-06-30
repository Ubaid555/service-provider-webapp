import React from 'react'

export default function TeamSec() {
    let message='Keep going';
  return (
    <section className='section_white'>
        <div className="container">
            <div className="row">
                <div className="col-md-12" text-center>
                    <h2 className='section_title'>
                        The Team Behind Trusty Taskers
                    </h2>
                    <p className='section_subtitle'>{message}</p>
                </div>

                <div className="col-sm-6" col-md-4>
                    <div className="team_item">
                        <img src='' className='team_img' alt='Member 1'/>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
  )
}
