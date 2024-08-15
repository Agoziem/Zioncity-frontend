"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function SmallScreenSideBar({ navList, sidebarref, currentUser, handleSidebarClose, setShowModal }) {
  const paths = usePathname();
  const router = useRouter();

  return (
    <aside className="sidebar d-block d-md-none" ref={sidebarref}>
      <ul className="sidebar-nav" id="sidebar-nav">
        {navList[0].Teacher.filter((navGroup) => {
          return !(
            paths.startsWith("/teachers-portal") &&
            !currentUser?.is_formteacher &&
            (navGroup.name === "Students" ||
              navGroup.name === "Students-result" ||
              navGroup.name === "Attendance")
          );
        }).map((navGroup) => (
          <li className="nav-item" key={navGroup._id}>
            <Link
              className={`nav-link ${paths === navGroup.link && "active"} ${
                navGroup.content && navGroup.content.length > 0
                  ? "collapsed"
                  : ""
              }`}
              href={`${navGroup.link}`}
              data-bs-toggle={
                navGroup.content && navGroup.content.length > 0
                  ? "collapse"
                  : ""
              }
              data-bs-target={`#${navGroup.name}`}
              onClick={(e) => {
                e.preventDefault();
                if (navGroup.content && navGroup.content.length > 0) {
                  return;
                } else {
                  router.push(`${navGroup.link}`);
                  handleSidebarClose();
                }
              }}
              {...(navGroup.name === "logout" && {
                onClick: (e) => {
                  e.preventDefault();
                  setShowModal(true);
                },
              })}
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
                    <Link
                      className={`nav-link ${
                        paths === subNav.link && "active"
                      }`}
                      href={"#"}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`${subNav.link}`);
                        handleSidebarClose();
                      }}
                    >
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

export default SmallScreenSideBar;
