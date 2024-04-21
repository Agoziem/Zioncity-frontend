"use client";

import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
import { FaUserCircle } from "react-icons/fa";

function NavAvatar() {
  const currentUser = useCurrentUser();

  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        {currentUser && currentUser.headshot ? (
          <img
            src={`${currentUser.headshot}`}
            alt="Profile"
            width={35}
            height={35}
            className="rounded-circle object-fit-cover"
            style={{ objectPosition: "top center" }}
          />
        ) : (
          <FaUserCircle className="text-muted" style={{ fontSize: "35px" }} />
        )}
        <span className="d-none d-md-block dropdown-toggle ps-2">
          {(currentUser && currentUser.firstname) ||
            (currentUser && currentUser.firstName) ||
            "User"}
        </span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>
            {(currentUser && currentUser.firstname) ||
              (currentUser && currentUser.firstName) ||
              "User"}
          </h6>
          <span>{(currentUser && currentUser.role) || "Student"}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link className="dropdown-item d-flex align-items-center" href="/">
            <i className="bi bi-house-door"></i>
            <span>Home page</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="users-profile.html"
          >
            <i className="bi bi-gear"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="pages-faq.html"
          >
            <i className="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
