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
  const Resultref = useRef(null);
  const newletterref = useRef(null);
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

  const [loading2, saveAsPDF2] = useJsxToPdf();
  const downloadToPdf2 = () => {
    saveAsPDF2(newletterref.current);
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

              {/*  download Result btn*/}
              <div className="px-1 px-md-5 d-flex justify-content-center justify-content-md-end ">
                <button
                  className="btn btn-primary my-4 mt-3"
                  onClick={() => downloadToPdf()}
                >
                  <FaDownload className="h5 me-2" />
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                      <span>downloading Result</span>
                    </>
                  ) : (
                    "Download Result"
                  )}
                </button>
              </div>

              {/* Newsletter */}
              <div className="card mx-1 mx-md-5" ref={newletterref}>
                <div className="mt-5 p-5 px-md-5">
                  <div className="text-center">
                    <h4>CITY OF GLORY SECONDARY SCHOOL ENEKWASUMPU</h4>
                    <p className="mb-0">
                      NEWS LETTER FOR SECOND TERM 2023/2024 ACADEMIC SESSION.
                    </p>
                    <p>22ND MARCH 2024</p>
                  </div>

                  <div className="mt-5">
                    <h5>APPRECIATION</h5>
                    <p>
                      Compliment of the season in advance. We give God all glory
                      and thanksgiving for the success of this term. He has been
                      our sure anchor. We appreciate the supervising priest of
                      the school, Rev. Canon Dr Eberechukwu Princewill Okonkwo,
                      the vicar of St. Silas Anglican church Enekwasumpu ( CITY
                      OF GLORY ) for being a great encouragement to us. Also ,
                      the management board chairman, Engr Kingsley Ozor for his
                      doggedness in helping pushing things to happen in the
                      school. The entire special team of staff of the school, I
                      salute your efforts. To all parents, I appreciate your
                      retentless efforts to see that your ward get the best.
                    </p>
                  </div>

                  <div className="mt-5">
                    <h5>ACADEMICS</h5>
                    <p>
                      WE have come to the end of second term of 2023/2024
                      academic session. Effective and Efficient teaching and
                      learning process is progressive in our school and we hope
                      to go higher.
                    </p>
                  </div>

                  {/* DISCIPLINE */}
                  <div className="mt-5">
                    <h5>DISCIPLINE</h5>
                    <p>
                      The school still maintains zero tolerance for any act of
                      indiscipline. Bullying, stealing, vandalization of school
                      properties and breaking of schools rules and regulations
                      attract their different levels of punishment - suspension
                      or indefinite suspension as the case may be. Please take
                      time to appeal to their consciences during this break.
                      Make them to understand the need to be disciplined in the
                      school.
                    </p>
                  </div>

                  {/* COLLECTION OF RESULT */}
                  <div className="mt-5">
                    <h5>COLLECTION OF RESULT</h5>
                    <p>
                      Students are to check their result online and submit
                      photocopy of the result to the school for documentation.
                    </p>
                  </div>

                  {/* RESUMPTION */}
                  <div className="mt-5">
                    <h5>RESUMPTION</h5>
                    <p>
                      Coming to school late is highly prohibited. Students who
                      report to school later than 7.30am will be seriously
                      punished.
                    </p>
                  </div>

                  {/* LATENESS TO SCHOOL */}
                  <div className="mt-5">
                    <h5>LATENESS TO SCHOOL</h5>
                    <p>
                      Coming to school late is highly prohibited. Students who
                      report to school later than 7.30am will be seriously
                      punished.
                    </p>
                  </div>

                  {/* PARENT AND TEACHERS ASSOCIATION ( PTA ) */}
                  <div className="mt-5">
                    <h5>PARENT AND TEACHERS ASSOCIATION ( PTA )</h5>
                    <p>
                      The PTA of the school has been very active and we
                      appreciate all parents. We wish to remind all parents that
                      the PTA meeting are not optional. Refusal to attend
                      attract a fine.
                    </p>
                  </div>

                  {/* BUILDING PROJECT FEES */}
                  <div className="mt-5">
                    <h5>BUILDING PROJECT FEES</h5>
                    <p>
                      We, again thank all the parents for their concerted effort
                      towards the building project going on. We wish to remind
                      our parents that the agreement to pay#2000 per student
                      still on.
                    </p>
                  </div>

                  {/* WASSCE / NECO */}
                  <div className="mt-5">
                    <h5>WASSCE / NECO</h5>
                    <p>
                      The timetable for the West African Senior School
                      Certificate Examination ( WASSCE ) has been released. The
                      examination will start on 30th April 2024. NECO timetable
                      is not yet out.
                    </p>
                  </div>

                  {/* *SCHOOL FEES */}
                  <div className="mt-5">
                    <h5>SCHOOL FEES</h5>
                    <p>
                      Some students still own their school fees, parents are
                      advised to pay up before their child / children resume for
                      the third term. The fees to be paid this term are stated
                      below and you are expected to pay with your child's name.
                    </p>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Payment Item</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>School fees </td>
                          <td>#16,500</td>
                        </tr>
                        <tr>
                          <td>Building project </td>
                          <td>#2,000</td>
                        </tr>
                        <tr>
                          <td>
                            Scratch card ( first, second and third term ){" "}
                          </td>
                          <td>#1,500</td>
                        </tr>
                        <tr>
                          <td>Sent off </td>
                          <td>#2,000</td>
                        </tr>
                        <tr>
                          <td>Novel </td>
                          <td>#500.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* BANK DETAILS */}
                  <div className="mt-5">
                    <h5>BANK DETAILS</h5>
                    <div className="row justify-content-between">
                      <div className="col-md">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th colSpan={"2"} className="fw-bold">
                                Akuchukwu microfinance
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Account name: </td>
                              <td>City of Glory secondary school</td>
                            </tr>
                            <tr>
                              <td>Account number </td>
                              <td>1180001371</td>
                            </tr>
                            <tr>
                              <td>Depositor</td>
                              <td>Students name.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="col-md">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th colSpan={"2"} className="fw-bold">
                                Zenith Bank PLC
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Account name: </td>
                              <td>City of Glory secondary school</td>
                            </tr>
                            <tr>
                              <td>Account number </td>
                              <td>1015358010</td>
                            </tr>
                            <tr>
                              <td>Depositor</td>
                              <td>Students name.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <p className="mt-2">Thanks for your usual co-operation.</p>
                  <div className="mt-5">
                    <h5 className="text-muted">Signed</h5>
                    <p className="font-weight-bold">Mrs Ezeuba Victoria.</p>
                    <p className="font-italic">( Principal )</p>
                  </div>
                </div>
              </div>

              {/* Download Newsletter btn */}
              <div className="px-1 px-md-5">
                <div className="d-block d-md-flex justify-content-center justify-content-md-end ">
                  <button
                    className={`btn btn-accent-primary me-0 me-md-3 mb-4 mb-md-0 ${
                      isSmallerThanMd ? "w-100" : ""
                    }`}
                    onClick={() => setShowResult(false)}
                  >
                    <TbArrowBackUp className="h4 me-2" />
                    Back
                  </button>

                  <button
                    className={`btn btn-primary mb-2 mb-md-0 ${
                      isSmallerThanMd ? "w-100" : ""
                    }`}
                    onClick={() => downloadToPdf2()}
                  >
                    <FaDownload className="h5 me-2" />
                    {loading2 ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        <span>downloading Newsletter</span>
                      </>
                    ) : (
                      "Download Newsletter"
                    )}
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
