// components/ResultDetails/ResultDetails.jsx
import React from "react";

const ResultDetails = ({ result, StudentData, getColorClass,studentClass }) => {
  return (
    <div className="card p-5">
      <div className="row align-items-center">
        <div className="col-md-3">
          <img
            src="/images/COG logo.png"
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
                <strong>{result.resultsummary.Student_name.firstname}</strong>
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-1 text-uppercase">
                <strong>{result.resultsummary.Student_name.surname}</strong>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-1">
                <strong>Class: </strong>
                {studentClass.class}
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

      {/* Result Table */}
      <div className="p-4">
        <h4 className="mt-2 text-center">Termly Result</h4>
        <div className="mt-2 resultCard table-responsive p-2">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Subject</th>
                <th>ResT</th>
                <th>2ndT</th>
                <th>PRO</th>
                <th>MDT</th>
                <th>IstA</th>
                <th>2ndA</th>
                <th>CA</th>
                <th>Exam</th>
                <th>Total</th>
                <th>Grade</th>
                <th>POS</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {result.subjectresults.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.Subject}</td>
                  <td>{subject.FirstTest}</td>
                  <td>{subject.SecondTest}</td>
                  <td>{subject.Project}</td>
                  <td>{subject.MidTermTest}</td>
                  <td>{subject.FirstAss}</td>
                  <td>{subject.SecondAss}</td>
                  <td>{subject.CA}</td>
                  <td>{subject.Exam}</td>
                  <td>{subject.Total}</td>
                  <td>{subject.Grade}</td>
                  <td>{subject.SubjectPosition}</td>
                  <td className={`${getColorClass(subject.Remark)} fw-bold`}>
                    {subject.Remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
