import React from "react";

const StudentDetails = ({ result, StudentData }) => {
  return (
    <div className="card p-5">
      <div className="row align-items-center">
        <div className="col-md-3">
          <img
            src={"/images/COG logo.png"}
            className="me-3 mb-2 mb-md-0"
            alt="profile"
            height={100}
            width={138}
          />
        </div>
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-1 text-uppercase">
                <strong>
                  {result.resultsummary.Student_name.firstname}
                </strong>
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-1 text-uppercase">
                <strong>
                  {result.resultsummary.Student_name.surname}
                </strong>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <p className="mb-1">
                <strong>Class: </strong>
                {StudentData.studentclass.class_}
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-1">
                <strong>Session: </strong>
                {result.resultsummary.AcademicSession.session}
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <p className="mb-1">
                <strong>Term: </strong>
                {result.resultsummary.Term.term}
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-1">
                <strong>Total Number: </strong>
                {result.resultsummary.Totalnumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
