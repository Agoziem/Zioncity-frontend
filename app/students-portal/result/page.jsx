"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Alert from "@/components/Alert/Alert";
import PageTitle from "@/components/PageTitle/PageTitle";
import { SchoolContext } from "@/data/Schoolcontextdata";
import { StudentsContext } from "@/data/Studentcontextdata";
import useLocalStorage from "@/hooks/useLocalStorage";
// import { FaUserCircle } from "react-icons/fa";
import "./result.css";
import { FaDownload } from "react-icons/fa6";
import { TbArrowBackUp } from "react-icons/tb";
import useJsxToPdf from "@/hooks/useJSXtoPDF";
import { useMediaQuery } from "@react-hook/media-query";
import { SiAdobeacrobatreader } from "react-icons/si";

const ResultPage = () => {
  const [showResult, setShowResult] = useState(false);
  const { schoolData } = useContext(SchoolContext);
  const { StudentData } = useContext(StudentsContext);
  const [terms, setTerms] = useState([]);
  const [resultdetails, setResultDetails] = useState({
    session_id: "",
    term_id: "",
    student_pin: "",
    student_id: "",
  });

  const [result, setResults] = useState([]);
  const [loadingresults, setLoadingResults] = useState(false);
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [newsletter, setNewsletter] = useState({});
  const Resultref = useRef(null);
  const isSmallerThanMd = useMediaQuery("(max-width: 768px)");

  const [storedresultdetails, setStoredResultDetails] = useLocalStorage(
    "resultdetails",
    resultdetails
  );

  useEffect(() => {
    setResultDetails(storedresultdetails);
  }, []);

  useEffect(() => {
    if (StudentData.id) {
      setResultDetails((prev) => ({
        ...prev,
        student_id: StudentData.id,
      }));
    }
  }, [StudentData.id]);

  // Fetch the terms for the school
  useEffect(() => {
    const fetchTerm = async () => {
      try {
        const response = await fetch(`${DJANGO_URL}/adminsapi/terms/`);
        const termData = await response.json();
        setTerms(termData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTerm();
  }, []);

  // Fetch the newsletter for the term

  const fetchNewsletter = async () => {
    try {
      const response = await fetch(
        `${DJANGO_URL}/adminsapi/get_newsletter/${resultdetails.session_id}/${resultdetails.term_id}`
      );
      const newsletterData = await response.json();
      setNewsletter(newsletterData);
      console.log(
        `${DJANGO_URL}/adminsapi/get_newsletter/${resultdetails.session_id}/${resultdetails.term_id}`
      );
      console.log(newsletterData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (resultdetails.session_id && resultdetails.term_id) fetchNewsletter();
  }, [resultdetails.session_id, resultdetails.term_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStoredResultDetails(resultdetails);
    fetchResults();
  };

  // fetch the Student Result
  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/getsubjectresults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultdetails),
        }
      );
      if (response.status === 404) {
        throw new Error("Invalid Credentials, Please try again");
      } else if (response.status === 400) {
        throw new Error(
          "Your Result have not been published yet, Please check back later"
        );
      }
      const jsonData = await response.json();
      setResults(jsonData);
      setShowResult(true);
    } catch (error) {
      setShowAlert(
        {
          show: true,
          message: `${error.message}`,
          type: `${
            error.message === "Invalid Credentials, Please try again"
              ? "danger"
              : "warning"
          }`,
        },
        setTimeout(() => {
          setShowAlert({ show: false, message: "", type: "" });
        }, 3000)
      );
      console.error("Error fetching data:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  const getColorClass = (remark) => {
    if (remark === "Excellent") {
      return "text-success";
    } else if (remark === "Good") {
      return "text-warning";
    } else if (remark === "Pass") {
      return "text-secondary";
    } else {
      return "text-danger";
    }
  };

  // download Result and newsletter to PDF
  const [loading, saveAsPDF] = useJsxToPdf();
  const downloadToPdf = () => {
    saveAsPDF(Resultref.current);
  };

  return (
    <div>
      <PageTitle pathname={"Student Result"} />

      {/* The result Pin confirmation */}
      <div className="mt-4">
        {!showResult ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="card d-flex p-5" style={{ maxWidth: "400px" }}>
              <h6 className="mb-4">
                Select result details to view your result
              </h6>

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
                    {schoolData.sessions &&
                      schoolData.sessions.length > 0 &&
                      schoolData.sessions.map((session) => (
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
                      setResultDetails({
                        ...resultdetails,
                        term_id: e.target.value,
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
          </div>
        ) : (
          result &&
          Object.keys(result).length > 0 && (
            <div>
              {/* Student details */}
              <div className="px-1 px-md-5" ref={Resultref}>
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

                {/* Result Table */}
                <div className="card p-4">
                  <div className="mt-4 resultCard table-responsive p-2">
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
                            <td
                              className={`${getColorClass(
                                subject.Remark
                              )} fw-bold `}
                            >
                              {subject.Remark}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Result Sunmmary */}
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
                          <td>{result.resultsummary.TotalScore}</td>
                        </tr>
                        <tr>
                          <td>Average Score</td>
                          <td>{result.resultsummary.Average}</td>
                        </tr>
                        <tr>
                          <td>Position</td>
                          <td className="fw-bold">
                            {result.resultsummary.Position}
                          </td>
                        </tr>
                        <tr>
                          <td>Remark</td>
                          <td
                            className={`${getColorClass(
                              result.resultsummary.Remark
                            )} fw-bold `}
                          >
                            {result.resultsummary.Remark}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              {Object.keys(newsletter).length > 0 ? (
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
              ) : (
                <div className="card mx-1 mx-md-5">
                  <div className="mt-5 p-5 px-md-5">
                    <p className="text-center">
                      Newsletter for this term is not available
                    </p>
                  </div>
                </div>
              )}

              {/* Download Newsletter btn */}
              <div className="px-1 px-md-5">
                <div className="d-block d-md-flex justify-content-center justify-content-md-end ">
                  <button
                    className={`btn btn-danger me-0 me-md-3 mb-4 mb-md-0 px-4 ${
                      isSmallerThanMd ? "w-100" : ""
                    }`}
                    onClick={() => downloadToPdf()}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        <span>downloading Result</span>
                      </>
                    ) : (
                      <>
                        <SiAdobeacrobatreader className="h5 me-2" /> Download Result
                      </>
                    )}
                  </button>

                  <button
                    className={`btn btn-accent-primary me-0 me-md-3 mb-4 mb-md-0 ${
                      isSmallerThanMd ? "w-100" : ""
                    }`}
                    onClick={() => setShowResult(false)}
                  >
                    <TbArrowBackUp className="h4 me-2" />
                    Back
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResultPage;
