// components/AnnualResultSummary/AnnualResultSummary.jsx
import React from 'react';

const AnnualResultSummary = ({ Annualresultsummary, getColorClass }) => {
  return (
    <div className="card p-4">
      <div className="resultCard table-responsive p-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Summary</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Score</td>
              <td>{Annualresultsummary?.TotalScore}</td>
            </tr>
            <tr>
              <td>Average Score</td>
              <td>{Annualresultsummary?.Average}</td>
            </tr>
            <tr>
              <td>Position</td>
              <td className="fw-bold">
                {Annualresultsummary?.Position}
              </td>
            </tr>
            <tr>
              <td>Principal&apos;s Verdict</td>
              <td
                className={`${getColorClass(
                  Annualresultsummary?.PrincipalVerdict
                )} fw-bold `}
              >
                {Annualresultsummary?.PrincipalVerdict}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnnualResultSummary;
