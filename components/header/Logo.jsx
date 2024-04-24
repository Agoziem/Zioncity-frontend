"use client";
import React, { useContext } from 'react';
import './logo.css';
import Link from 'next/link';
import { SchoolContext } from '@/data/Schoolcontextdata';

function Logo({portalname,portallink}) {
  const { schoolData } = useContext(SchoolContext)
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Link href={`/${portallink}`} className="logo d-flex align-items-center">
        {
          schoolData && schoolData.Schoollogo &&
          <img src={schoolData.Schoollogo} alt="logo" width={50} className='me-3' />
        }
        <span className="d-none d-lg-block">{portalname}</span>
      </Link>
      <i
        className="bi bi-list toggle-sidebar-btn"
        onClick={handleToggleSideBar}
      ></i>
    </div>
  );
}

export default Logo;
