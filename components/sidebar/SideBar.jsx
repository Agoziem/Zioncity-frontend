"use client";
import React from 'react';
import './sideBar.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation'


function SideBar({navList}) {
  const paths = usePathname()

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
      {navList[0].Teacher.map(nav => (
        <li className={`nav-item ${nav.content && nav.content.length > 0 ? 'has-submenu' : ''}`} key={nav._id}>
          <Link
            className={`nav-link ${ paths === nav.link ? '' : 'collapsed'}`}
            href={`${nav.link}`}
            {...(nav.content && nav.content.length > 0 ? {'data-bs-target': `#${nav.name}`, 'data-bs-toggle': 'collapse'} : {})}
          >
            <i className={nav.icon}></i>
            <span>{nav.name}</span>
            {nav.content && nav.content.length > 0 && (
              <i className="bi bi-chevron-down ms-auto"></i>
              )
            }
          </Link>
          {nav.content && nav.content.length > 0 && (
            <ul
              id={`${nav.name}`}
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {nav.content.map(subnav => (
                <li key={subnav._id}>
                  <Link href={`${subnav.link}`}>
                    <i className={subnav.icon}></i>
                    <span>{subnav.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        ))}

      {
        navList.length > 1 && (
          <>
            <li className="nav-heading">Formteacher</li>
            {navList[1].Formteacher.map(nav => (
              <li className="nav-item" key={nav._id}>
                <Link className={`nav-link ${ paths === nav.link ? '' : 'collapsed'} `}href={`${nav.link}`}>
                  <i className={nav.icon}></i>
                  <span>{nav.name}</span>
                </Link>
              </li>
            ))}
          </>
        )
      }
      

      
    </ul>
</aside>

  );
}

export default SideBar;
