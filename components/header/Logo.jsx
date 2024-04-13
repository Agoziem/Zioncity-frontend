import React from 'react';
import './logo.css';
import Image from 'next/image' 
import Link from 'next/link';

function Logo({portalname,portallink}) {
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Link href={`/${portallink}`} className="logo d-flex align-items-center">
        <Image src="/images/GDD Impact.jpg" alt="logo" width={35} height={35} className='me-3' />
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
