"use client";
import PageTitle from "@/components/PageTitle/PageTitle";
import { SchoolContext } from "@/data/Schoolcontextdata";
import { StudentsContext } from "@/data/Studentcontextdata";
import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

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

  useEffect(() => {
    if (StudentData) {
      console.log(StudentData);
      setResultDetails({
        ...resultdetails,
        student_id: StudentData.id,
      });
    }
  }, [StudentData]);

  // Fetch the terms for the school
  useEffect(() => {
    const fetchTerm = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/adminsapi/terms/`);
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
    fetchResults();
  };

  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/resultapi/getsubjectresults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultdetails),
        }
      );
      if (!response.ok) {
        throw new Error("Invalid Credentials, Please try again");
      }
      const jsonData = await response.json();
      setResults(jsonData);
      setShowResult(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  return (
    <div>
      <PageTitle pathname={"Student Result"} />

      {/* The result Pin confirmation */}
      <div className="d-flex justify-content-center mt-5">
        {!showResult ? (
          <div className="card d-flex p-5" style={{ maxWidth: "400px" }}>
            <h6 className="mb-4">Select result details to view your result</h6>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="AcademicSession">Academic Session</label>
                <select
                  className="form-select"
                  id="AcademicSession"
                  onChange={(e) => {
                    setResultDetails({
                      ...resultdetails,
                      session_id: e.target.value,
                    });
                  }}
                >
                  <option value="0">Select Session</option>
                  {schoolData &&
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
                {loadingresults ? "Loading Result..." : "View Result"}
              </button>
            </form>
          </div>
        ) : (
          //   {
          //     "id": 80,
          //     "Student_name": {
          //         "firstname": "Chinaza",
          //         "surname": "Ogbuji"
          //     },
          //     "Term": {
          //         "id": 5,
          //         "term": "1st Term"
          //     },
          //     "AcademicSession": {
          //         "id": 2,
          //         "session": "2022/2021"
          //     },
          //     "TotalScore": "230",
          //     "Totalnumber": "11",
          //     "Average": "115",
          //     "Position": "3rd",
          //     "Remark": "Excellent",
          //     "published": true
          // }

          //   [
          //     {
          //         "id": 65,
          //         "student": "Chinaza",
          //         "Subject": "English",
          //         "Term": "1st Term",
          //         "AcademicSession": "2022/2021",
          //         "student_class": "Jss1B",
          //         "student_school": "Kings College",
          //         "FirstTest": "4",
          //         "FirstAss": "3",
          //         "MidTermTest": "5",
          //         "Project": "2",
          //         "SecondAss": "4",
          //         "SecondTest": "5",
          //         "CA": "23",
          //         "Exam": "76",
          //         "Total": "122",
          //         "Grade": "A",
          //         "SubjectPosition": "1st",
          //         "Remark": "Excellent",
          //         "is_offering": true,
          //         "published": true
          //     },
          //     {
          //         "id": 101,
          //         "student": "Chinaza",
          //         "Subject": "Igbo Language",
          //         "Term": "1st Term",
          //         "AcademicSession": "2022/2021",
          //         "student_class": "Jss1B",
          //         "student_school": "Kings College",
          //         "FirstTest": "3",
          //         "FirstAss": "5",
          //         "MidTermTest": "8",
          //         "Project": "4",
          //         "SecondAss": "4",
          //         "SecondTest": "3",
          //         "CA": "27",
          //         "Exam": "56",
          //         "Total": "110",
          //         "Grade": "A",
          //         "SubjectPosition": "3rd",
          //         "Remark": "Excellent",
          //         "is_offering": true,
          //         "published": true
          //     }
          // ]
          result &&
          Object.keys(result).length > 0 && (
            <div>
              <h4 className="mb-4">Your Result</h4>
              <div className="card p-5">
                <div className="row align-items-center justify-content-between ">
                  <div className="col-lg-2">
                    {StudentData.headshot ? (
                      <img
                        src={StudentData.headshot}
                        className="rounded-circle object-fit-cover me-3"
                        alt="profile"
                        height={75}
                        width={75}
                        style={{ objectPosition: "top center" }}
                      />
                    ) : (
                      <>
                        <FaUserCircle
                          className="me-3 text-muted"
                          alt="profile"
                          style={{ fontSize: "75px" }}
                        />
                      </>
                    )}
                  </div>
                  <div className="col-6 col-md-3">
                    <p>
                      <strong>Firstname: </strong>
                      {result.resultsummary.Student_name.firstname}
                    </p>
                    <p>
                      <strong>Surname: </strong>
                      {result.resultsummary.Student_name.surname}
                    </p>
                    <p>
                      <strong>Class: </strong>
                      {StudentData.studentclass.class_}
                    </p>
                    <p>
                      <strong>Session: </strong>
                      {result.resultsummary.AcademicSession.session}
                    </p>
                    <p>
                      <strong>Term: </strong>
                      {result.resultsummary.Term.term}
                    </p>
                  </div>
                  <div className="col-6 col-md-3">
                    <p>
                      <strong>Total Score: </strong>
                      {result.resultsummary.TotalScore}
                    </p>
                    <p>
                      <strong>Total Number: </strong>
                      {result.resultsummary.Totalnumber}
                    </p>
                    <p>
                      <strong>Average: </strong>
                      {result.resultsummary.Average}
                    </p>
                    <p>
                      <strong>Position: </strong>
                      {result.resultsummary.Position}
                    </p>
                    <p>
                      <strong>Remark: </strong>
                      {result.resultsummary.Remark}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 card table-responsive p-5">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>1stT</th>
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
                        <td>{subject.Remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResultPage;
