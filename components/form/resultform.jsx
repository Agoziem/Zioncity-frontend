"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";
import Alert from "../Alert/Alert";

const ResultForm = ({
  showAlert,
  studentresult,
  setStudentResult,
  submitting,
  handleSubmit,
}) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="card p-4">
      <h5 className="text-center mb-4">
        Update {studentresult.student ? studentresult.student : "Student"}
        {"'s "}
        Result
      </h5>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md mx-0 mx-md-3 form-group">
            <label htmlFor="FirstTest">First Test</label>
            <input
              type="text"
              className="form-control"
              id="FirstTest"
              name="FirstTest"
              value={studentresult.FirstTest}
              onChange={(e) =>
                setStudentResult({
                  ...studentresult,
                  FirstTest: e.target.value,
                })
              }
            />
          </div>

          <div className=" col-md mx-0 mx-md-3 form-group">
            <label htmlFor="FirstAss">First Assignment</label>
            <input
              type="text"
              className="form-control"
              id="FirstAss"
              name="FirstAss"
              value={studentresult.FirstAss}
              onChange={(e) =>
                setStudentResult({ ...studentresult, FirstAss: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md  mx-0 mx-md-3 form-group">
            <label htmlFor="MidTermTest">Mid Term Test</label>
            <input
              type="text"
              className="form-control"
              id="MidTermTest"
              name="MidTermTest"
              value={studentresult.MidTermTest}
              onChange={(e) =>
                setStudentResult({
                  ...studentresult,
                  MidTermTest: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md mx-0 mx-md-3 form-group">
            <label htmlFor="Project">Project</label>
            <input
              type="text"
              className="form-control"
              id="Project"
              name="Project"
              value={studentresult.Project}
              onChange={(e) =>
                setStudentResult({ ...studentresult, Project: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md mx-0 mx-md-3 form-group">
            <label htmlFor="SecondAss">Second Assignment</label>
            <input
              type="text"
              className="form-control"
              id="SecondAss"
              name="SecondAss"
              value={studentresult.SecondAss}
              onChange={(e) =>
                setStudentResult({
                  ...studentresult,
                  SecondAss: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md mx-0 mx-md-3 form-group">
            <label htmlFor="SecondTest">Second Test</label>
            <input
              type="text"
              className="form-control"
              id="SecondTest"
              name="SecondTest"
              value={studentresult.SecondTest}
              onChange={(e) =>
                setStudentResult({
                  ...studentresult,
                  SecondTest: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-md-6 mx-0 mx-md-3 form-group">
            <label htmlFor="Exam">Exam</label>
            <input
              type="text"
              className="form-control"
              id="Exam"
              name="Exam"
              value={studentresult.Exam}
              onChange={(e) =>
                setStudentResult({ ...studentresult, Exam: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row mt-3 align-items-center ">
          {showAlert.show && (
            <Alert type={showAlert.type}>{showAlert.message}</Alert>
          )}
          <div className="col-md mx-0 mx-md-3">
            <button
              type="submit"
              className="btn btn-accent-primary mt-4 w-100"
              disabled={submitting}
              onClick={handleGoBack}
            >
              <IoArrowUndoSharp className="me-3 h5" />
              back to results
            </button>
          </div>

          <div className="col-md mx-0 mx-md-3">
            <button
              type="submit"
              className="btn btn-primary mt-4 w-100"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  <span>submitting result ...</span>
                </>
              ) : (
                "Submit Result"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResultForm;
