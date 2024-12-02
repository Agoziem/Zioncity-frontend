import React from "react";
import Alert from "@/components/Alert/Alert";

const ResultForm = ({
  resultdetails,
  setResultDetails,
  handleSubmit,
  showAlert,
  loadingresults,
  sessions,
  terms,
}) => {
  return (
    <div className="card d-flex p-5" style={{ maxWidth: "400px" }}>
      <h6 className="mb-4">Select result details to view your result</h6>

      <form onSubmit={handleSubmit}>
        {showAlert.show && (
          <Alert type={showAlert.type}>{showAlert.message}</Alert>
        )}
        <div className="form-group mb-3">
          <label htmlFor="AcademicSession">Academic Session</label>
          <select
            className="form-select"
            id="AcademicSession"
            value={resultdetails.session_id}
            onChange={(e) => {
              setResultDetails({
                ...resultdetails,
                session_id: e.target.value,
              });
            }}
          >
            <option value="0">Select Session</option>
            {sessions &&
              sessions.length > 0 &&
              sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.session}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="Term">Term</label>
          <select
            className="form-select"
            id="Term"
            value={resultdetails.term_id}
            onChange={(e) => {
              const selectedTerm = terms.find(
                (term) => term.id === parseInt(e.target.value)
              );
              setResultDetails({
                ...resultdetails,
                term_id: e.target.value,
                isAnnual: selectedTerm && selectedTerm.term === "3rd Term",
              });
            }}
          >
            <option value="0">Select Term</option>
            {terms.length > 0 &&
              terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.term}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="student_pin">Result Pin</label>
          <input
            type="text"
            className="form-control"
            id="student_pin"
            placeholder="Enter your result pin"
            value={resultdetails.student_pin}
            onChange={(e) => {
              setResultDetails({
                ...resultdetails,
                student_pin: e.target.value,
              });
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loadingresults}
        >
          {loadingresults ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
              <span>Loading Results</span>
            </>
          ) : (
            "View Result"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResultForm;
