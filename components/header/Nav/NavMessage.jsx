import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";

function NavMessage() {
  const { currentUser, currentRoot } = useCurrentUser();

  if (currentRoot && currentRoot !== "students-portal") {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
          <i className="bi bi-chat-left-text"></i>
          {/* Uncomment the line below if you want to display the number of new messages */}
          {/* <span className="badge bg-success badge-number">3</span> */}
        </a>

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
          <li className="dropdown-header">
            You have 0 new messages at the moment
            {/* Uncomment the link below if you want to add a "View all" button */}
            {/* <a href="#">
              <span className="badge rounded-pill bg-primary p-2 ms-2">
                View all
              </span>
            </a> */}
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li className="message-item">
            <a href="#">
              <div className="px-4">
                <h4>Message header</h4>
                <p>No messages yet</p>
                <p>4 hrs. ago</p>
              </div>
            </a>
          </li>

          {/* Uncomment the line below if you want to add a footer link */}
          {/* <li className="dropdown-footer">
            <a href="#">Show all messages</a>
          </li> */}
        </ul>
      </li>
    );
  }

  return null;
}

export default NavMessage;
