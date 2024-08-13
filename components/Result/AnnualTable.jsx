// components/AnnualResultDetails/AnnualResultDetails.jsx
import React from 'react';

const AnnualResultDetails = ({ Annualresult, getColorClass }) => {
  return (
    <div className="card p-4">
      <h4 className='mt-4 text-center'>Annual Result</h4>
      <div className="mt-2 resultCard table-responsive p-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Subject</th>
              <th>1st Term</th>
              <th>2nd Term</th>
              <th>3rd Term</th>
              <th>Total</th>
              <th>Ave</th>
              <th>Grade</th>
              <th>POS</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {Annualresult?.annualsubjectresults?.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.Subject}</td>
                <td>{subject.FirstTermTotal}</td>
                <td>{subject.SecondTermTotal}</td>
                <td>{subject.ThirdTermTotal}</td>
                <td>{subject.Total}</td>
                <td>{subject.Average}</td>
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
  );
};

export default AnnualResultDetails;
