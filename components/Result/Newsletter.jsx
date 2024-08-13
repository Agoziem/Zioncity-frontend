import React from "react";
import { FaDownload } from "react-icons/fa6";

const Newsletter = ({ newsletter }) => {
  return (
    <div className="card mx-1 mx-md-5">
      <div className="row justify-content-between p-5 px-md-5 align-items-center">
        <div className="col-md-6">
          <h5>School Termly Newsletter</h5>
          <p>
            {newsletter.term.name} ({newsletter.session.name})
          </p>
        </div>
        <div className="col-md-4 ">
          <a
            href={newsletter.Newsletterfile}
            download
            target="_blank"
            className="btn btn-primary"
          >
            <FaDownload className="h5 me-2" />
            download Newsletter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
