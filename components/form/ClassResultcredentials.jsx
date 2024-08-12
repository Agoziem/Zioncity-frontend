"use client";
import React from "react";

const ClassResultcredentials = ({
  handleSubmit,
  loadingresults,
  classresultcredential,
  setClassResultscredential,
  schoolsessions,
  schoolterms = [],
  isAnnual = false,
}) => {
  return (
    <div>
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* term */}
        {!isAnnual && (
          <div className="col-md-6">
            <label htmlFor="termselect" className="form-label">
              Term
            </label>
            <select
              id="termselect"
              className="form-select"
              value={classresultcredential.term_id}
              onChange={(e) =>
                setClassResultscredential({
                  ...classresultcredential,
                  term_id: e.target.value,
                })
              }
            >
              {schoolterms.length === 0 ? (
                <option value="">No Term Found</option>
              ) : (
                <option value="">Select Term</option>
              )}
              {schoolterms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.term}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* session */}
        <div className="col-md-6">
          <label htmlFor="sessionselect" className="form-label">
            Academic Session
          </label>
          <select
            id="sessionselect"
            className="form-select"
            value={classresultcredential.session_id}
            onChange={(e) =>
              setClassResultscredential({
                ...classresultcredential,
                session_id: e.target.value,
              })
            }
          >
            {schoolsessions.length === 0 ? (
              <option value="">No Session Found</option>
            ) : (
              <option value="">Select Session</option>
            )}
            {schoolsessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.session}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div className="col-12 mt-4 d-flex align-items-center  ">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loadingresults}
          >
            {loadingresults ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
                <span>Fetching result ...</span>
              </>
            ) : (
              "Get Results"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassResultcredentials;
