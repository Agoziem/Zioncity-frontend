"use client";
import React from "react";
import "./sideBar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBar({ navList }) {
  const paths = usePathname();

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {navList[0].Teacher.map((navGroup) => (
          <li className="nav-item" key={navGroup._id}>
            <Link
              className={`nav-link ${paths === navGroup.link && 'active' } ${
                navGroup.content && navGroup.content.length > 0
                  ? "collapsed"
                  : ""
              }`}
              href={navGroup.link}
              data-bs-toggle={
                navGroup.content && navGroup.content.length > 0
                  ? "collapse"
                  : ""
              }
              data-bs-target={`#${navGroup.name}`}
            >
              <i className={navGroup.icon}></i>
              <span>{navGroup.name}</span>
              {navGroup.content && navGroup.content.length > 0 && (
                <i className="bi bi-chevron-down ms-auto"></i>
              )}
            </Link>
            {navGroup.content && navGroup.content.length > 0 && (
              <ul
                id={navGroup.name}
                className="nav-content collapse"
                data-bs-parent="#sidebar-nav"
              >
                {navGroup.content.map((subNav) => (
                  <li key={subNav._id}>
                    <Link className={`nav-link ${paths === subNav.link && 'active' }`}href={subNav.link}>
                      <i className={subNav.icon}></i>
                      <span>{subNav.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
