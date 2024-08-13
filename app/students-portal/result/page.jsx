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
import ResultDetails from "@/components/Result/ResultTable";
import ResultSummary from "@/components/Result/ResultSummary";
import AnnualResultDetails from "@/components/Result/AnnualTable";
import AnnualResultSummary from "@/components/Result/AnnualSummary";
import ResultForm from "@/components/Result/ResultForm";
import Newsletter from "@/components/Result/Newsletter";

const ResultPage = () => {
  const [showResult, setShowResult] = useState(false);
  const { schoolData } = useContext(SchoolContext);
  const { StudentData } = useContext(StudentsContext);
  const [terms, setTerms] = useState([]);
  const [resultdetails, setResultDetails] = useState({
    isAnnual: false,
    session_id: "",
    term_id: "",
    student_pin: "",
    student_id: "",
  });

  const [result, setResults] = useState({});
  const [Annualresult, setAnnualResults] = useState({});
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

  // ---------------------------------------
  // Fetch the terms for the school
  // ---------------------------------------
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

  // ---------------------------------------
  // Fetch the newsletter for the term
  // ---------------------------------------
  const fetchNewsletter = async () => {
    try {
      const response = await fetch(
        `${DJANGO_URL}/adminsapi/get_newsletter/${resultdetails.session_id}/${resultdetails.term_id}`
      );
      const newsletterData = await response.json();
      setNewsletter(newsletterData);
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

    // Fetch annual results only if it's the 3rd Term
    if (resultdetails.isAnnual) {
      fetchAnnualResults();
    }
  };

  // ---------------------------------------
  // fetch the Student Result
  // ---------------------------------------
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
      setShowAlert({
        show: true,
        message: `${error.message}`,
        type: `${
          error.message === "Invalid Credentials, Please try again"
            ? "danger"
            : "warning"
        }`,
      });

      setTimeout(() => {
        setShowAlert({ show: false, message: "", type: "" });
      }, 3000);
      console.error("Error fetching data:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  // ---------------------------------------
  // fetch the Student Annual Result
  // ---------------------------------------
  const fetchAnnualResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/getsubjectannualresults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultdetails),
        }
      );
      const jsonData = await response.json();
      setAnnualResults(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  // ---------------------------------------
  // get the color class for the remark
  // ---------------------------------------
  const getColorClass = (remark) => {
    if (remark === "Excellent") {
      return "text-success";
    } else if (remark === "Good") {
      return "text-warning";
    } else if (remark === "Pass") {
      return "text-secondary";
    } else if (remark === "Promoted") {
      return "text-success";
    } else {
      return "text-danger";
    }
  };

  // ---------------------------------------
  // download Result and newsletter to PDF
  // ---------------------------------------
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
            <ResultForm
              resultdetails={resultdetails}
              setResultDetails={setResultDetails}
              handleSubmit={handleSubmit}
              showAlert={showAlert}
              terms={terms}
              schoolData={schoolData}
              loadingresults={loadingresults}
            />
          </div>
        ) : (
          result &&
          Object.keys(result).length > 0 && (
            <div>
              {/* Student details */}
              <div className="px-1 px-md-5" ref={Resultref}>
                <ResultDetails
                  result={result}
                  StudentData={StudentData}
                  getColorClass={getColorClass}
                />
                <ResultSummary
                  resultsummary={result.resultsummary}
                  getColorClass={getColorClass}
                />

                {/* Annual Table */}
                {resultdetails.isAnnual && (
                  <>
                    <AnnualResultDetails
                      Annualresult={Annualresult}
                      getColorClass={getColorClass}
                    />
                    <AnnualResultSummary
                      Annualresultsummary={Annualresult.annualresultsummary}
                      getColorClass={getColorClass}
                    />
                  </>
                )}
              </div>

              {/* Newsletter */}
              {Object.keys(newsletter).length > 0 ? (
                <Newsletter newsletter={newsletter} />
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
                        <SiAdobeacrobatreader className="h5 me-2" /> Download
                        Result
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
