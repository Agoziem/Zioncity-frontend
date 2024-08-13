// components/ResultSummary/ResultSummary.jsx
import React from 'react';

const ResultSummary = ({ resultsummary, getColorClass }) => {
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
              <td>{resultsummary.TotalScore}</td>
            </tr>
            <tr>
              <td>Average Score</td>
              <td>{resultsummary.Average}</td>
            </tr>
            <tr>
              <td>Position</td>
              <td className="fw-bold">{resultsummary.Position}</td>
            </tr>
            <tr>
              <td>Remark</td>
              <td className={`${getColorClass(resultsummary.Remark)} fw-bold`}>
                {resultsummary.Remark}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultSummary;
