"use client";
import React from 'react';
import { FaTimes } from "react-icons/fa";
import './modal.css';

const Modal = ({ children,modal,toggleModal}) => {
  
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  

    return (
        <>
          {modal && (
            <div>
                <div className="modal">
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                    {children}
                    <FaTimes className="close-modal" onClick={toggleModal} />
                  </div>
                </div>
              </div>
          )}
        </>
    );
  };

export default Modal;