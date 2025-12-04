"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Access-cards.css";
import useJsxToPdf from "@/hooks/useJSXtoPDF";
import { SchoolContext } from "@/data/Schoolcontextdata";
import useLocalStorage from "@/hooks/useLocalStorage";

const AccountsPage = () => {
  const { schoolData, academicsessions } = useContext(SchoolContext);
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;
  const [paginateddata, setPaginatedData] = useState({});
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [page, setPage] = useState(1);
  const cardfrontref = useRef(null);
  const cardbackref = useRef(null);
  const [loading, generatePdf] = useJsxToPdf();
  const [loadingback, generatePdfback] = useJsxToPdf();
  const [storedcurrentSessionID, setStoredCurrentSessionID] = useLocalStorage(
    "currentSessionID",
    null
  );

  const number_of_students_per_card = 21;
  const total_number_of_students = 407;
  const number_of_cards = Math.ceil(
    total_number_of_students / number_of_students_per_card
  );

  // Dummy data for testing card back
  const dummyStudents = Array.from({ length: number_of_students_per_card }, (_, i) => ({
    id: i + 1,
    firstname: `John${i + 1}`,
    surname: `Doe${i + 1}`,
    student_id: `STU${String(i + 1).padStart(4, '0')}`,
    student_pin: `${Math.floor(1000 + Math.random() * 9000)}`,
    class_: { class_name: `JSS ${(i % 3) + 1}` }
  }));

  const fetchSchoolStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await fetch(
        `${DJANGO_URL}/studentsapi/${storedcurrentSessionID}?=1&page=${page}`
      );
      const data = await res.json();
      setPaginatedData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    if (storedcurrentSessionID) {
      fetchSchoolStudents();
    }
  }, [page, storedcurrentSessionID]);

  const handleDownloadfront = async () => {
    await generatePdf(cardfrontref.current);
  };

  const handleDownloadback = async () => {
    await generatePdfback(cardbackref.current);
  };

  return (
    <section className="py-4 d-flex flex-column align-items-center">
      <div className="d-flex mb-3 align-items-center">
        <h5>COG Students Card - Front </h5>

        <button
          className="btn btn-sm btn-primary ms-5"
          onClick={handleDownloadfront}
        >
          download Cards
          {loading && (
            <span
              className="spinner-border spinner-border-sm ms-1"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </div>

      <div ref={cardfrontref} className="student_card_container">
        {Array.from({ length: number_of_students_per_card }, (_, index) => (
          <div key={index} className="student_card">
            {/* Content of each student card */}
            <img
              className="studentcardimg"
              src="/images/student_card_front.jpg"
              alt={`Student Card ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="d-flex my-5 align-items-center">
        <h5>SMSS Students Card - Back</h5>
        <div className="ms-3">
          {paginateddata && paginateddata.previous !== null && (
            <>
              <span
                className="me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setPage(1)}
              >
                {"«"} First
              </span>
              <span
                className="me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </span>
            </>
          )}
          page <span className="fw-bold">{page}</span> of{" "}
          <span className="fw-bold me-2">{number_of_cards}</span>
          {paginateddata && paginateddata.next !== null && (
            <>
              <span
                className="me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setPage(page + 1)}
              >
                Next
              </span>
              <span
                className="me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setPage(number_of_cards)}
              >
                Last {"»"}
              </span>
            </>
          )}
        </div>
        <div className="mx-3">
          <select
            id="academicSession"
            className="form-select"
            value={storedcurrentSessionID || ""}
            onChange={(e) => setStoredCurrentSessionID(e.target.value)}
          >
            <option value="" disabled>
              Session...
            </option>
            {academicsessions?.map((session) => (
              <option key={session.id} value={session.id}>
                {session.session}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-sm btn-primary ms-5"
          onClick={handleDownloadback}
        >
          download Cards
          {loadingback && (
            <span
              className="spinner-border spinner-border-sm ms-1"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </div>

      <div ref={cardbackref} className="student_card_container">
        {loadingStudents ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : paginateddata.results && paginateddata.results.length > 0 ? (
          paginateddata.results.map((student) => (
            <div key={student.id} className="studentcard">
              <img
                className="studentcardimg"
                src="/images/student_card_Back.jpg"
                alt=""
              />
              <div className="text-overlay">
                <h2 style={{ color: "#113325" }}>
                  {student.firstname} {student.surname}
                </h2>
                <p>{student.student_id}</p>
                <p>{student.student_pin}</p>
                <h1 style={{ color: "#113325" }}>
                  {student.class_.class_name}
                </h1>
              </div>
            </div>
          ))
        ) : (
          <p>No students found</p>
        )}
      </div>
    </section>
  );
};

export default AccountsPage;
