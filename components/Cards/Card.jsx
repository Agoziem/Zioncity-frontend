import React, { useState } from 'react';
import './card.css';


function Card({ cardtitle,cardbody,icon }) {
  const [filter, setFilter] = useState('Today');
  // const handleFilterChange = filter => {
  //   setFilter(filter);
  // };

  return (
    <div className="col-xxl-4 col-md-6">
      <div className={`card info-card
          ${
            cardtitle === "classes taught" ? "classes" :
            cardtitle === "Subjects taught" ? "subjects" :
            cardtitle === "School classes" ? "classes" :
            cardtitle === "School Subjects" ? "subjects" :
            "Form-teacher"
        }`}>
        <div className="card-body">
          <h5 className="card-title">
            {cardtitle}
          </h5>

          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={icon}></i>
            </div>
            <div className="ps-3">
              <h6>
                {cardbody} 
              </h6>
              <span className="text-muted small pt-2 ps-1">
                {
                  cardtitle === "classes taught" ? "classes" :
                  cardtitle === "Subjects taught" ? "subjects" :
                  cardtitle === "School classes" ? "classes" :
                  cardtitle === "School Subjects" ? "Subjects" :
                  cardtitle === "Student Class" ? "Student Class" :
                  "Form teacher"
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
