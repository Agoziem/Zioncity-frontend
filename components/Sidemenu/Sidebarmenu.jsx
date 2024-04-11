"use client";
import React, { useState } from 'react';

const Sidebarmenu = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (submenuId) => {
    setOpenSubMenu(openSubMenu === submenuId ? null : submenuId);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#" onClick={() => toggleSubMenu(1)}>Services</a>
          <ul className={`submenu ${openSubMenu === 1 ? 'open' : ''}`}>
            <li>
              <a href="#">Service 1</a>
            </li>
            <li>
              <a href="#">Service 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebarmenu;
