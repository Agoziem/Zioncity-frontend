"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import { SchoolContext } from "@/data/Schoolcontextdata";
import { TeacherContext } from "@/data/Teachercontextdata";
import { TiArrowForward } from "react-icons/ti";
import { FaCheck, FaTimes } from "react-icons/fa";
import "@/components/Datatable/Datatable.css";
import Datatable from "@/components/Datatable/Datatable";
import ClassResultDatatableitems from "@/components/Datatable/ClassResultTableitems";
import ClassResultcredentials from "@/components/form/ClassResultcredentials";

import useLocalStorage from "@/hooks/useLocalStorage";
import classResulthandler from "@/utils/classResulthandler";
import SubjectResultPublishedlist from "@/components/Datatable/SubjectResultPublishedlist";
import Alert from "@/components/Alert/Alert";
import Modal from "@/components/Modal/modal";

const Page = () => {
  const { schoolData } = useContext(SchoolContext);
  const { teacherData } = useContext(TeacherContext);
  const [terms, setTerms] = useState([]);
  const [result, setResults] = useState([]);
  const [computedResults, setComputedResults] = useState([]);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [classresultcredential, setClassResultscredential] = useState({
    term_id: "",
    session_id: "",
    class_id: "",
    school_id: "",
  });

  const [loadingterms, setLoadingterms] = useState(false);
  const [loadingresults, setLoadingResults] = useState(false);
  const [publishingResults, setPublishingResults] = useState(false);
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  // Fetch the terms for the school
  useEffect(() => {
    const fetchTerm = async () => {
      setLoadingterms(true);
      try {
        const response = await fetch(`${DJANGO_URL}/adminsapi/terms/`);
        const termData = await response.json();
        setTerms(termData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingterms(false);
      }
    };

    fetchTerm();
  }, []);

  // update the Credentials with what is in the Local Storage
  const [storedClassCredentialValue, setClassCredentialValue] = useLocalStorage(
    "classresultcredential",
    classresultcredential
  );
  useEffect(() => {
    setClassResultscredential(storedClassCredentialValue);
  }, []);

  // set the needed data when they are available
  let schoolsessions = [];
  let schoolID;
  let classID;
  let className;
  let schoolterms = [];

  if (
    schoolData &&
    teacherData &&
    Object.keys(schoolData).length &&
    Object.keys(teacherData).length
  ) {
    schoolsessions = schoolData.sessions || [];
    schoolID = schoolData.id || "";
    classID = teacherData.classFormed.id || "";
    className = teacherData.classFormed.name || "";
    schoolterms = terms || [];
  }

  // update the result credentials when the school_id & class_id is available or changes
  useEffect(() => {
    if (schoolID && classID) {
      setClassResultscredential((prevCredential) => ({
        ...prevCredential,
        school_id: schoolID,
        class_id: classID,
      }));
    }
  }, [schoolID, classID]);

  // Fetch the Results when the school_id is available on page load &
  // when the id changes by submitting the credential form
  useEffect(() => {
    if (
      classresultcredential.school_id &&
      classresultcredential.class_id &&
      classresultcredential.term_id &&
      classresultcredential.session_id
    ) {
      fetchResults();
    }
  }, [classresultcredential.school_id, classresultcredential.class_id]);

  // store the credentials to the local storage & fetch the results when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    setClassCredentialValue(classresultcredential);
    fetchResults();
  };

  // fetch the Results of the Students in a class for a particular Subject in a Class
  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/getResultSummaries/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classresultcredential),
        }
      );
      const jsonData = await response.json();
      setResults(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  // Compute the results by the passing it through the Student Result Computation Algorithm
  useEffect(() => {
    if (result.length > 0) {
      const computedResults = classResulthandler(result);
      setComputedResults(computedResults);
    }
  }, [result]);

  // Publish the results to the students
  const handlePublishResults = async () => {
    setPublishingResults(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/postResultSummaries/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(computedResults),
        }
      );

      if (response.ok) {
        setComputedResults((prevResults) =>
          prevResults.map((result) => ({
            ...result,
            published: true,
          }))
        );
        setPublishingResults(false);
        setShowModal(!showModal);
        setShowAlert(
          {
            show: true,
            message: "Results Published Successfully",
            type: "success",
          },
          setTimeout(() => {
            setShowAlert({ show: false, message: "", type: "" });
          }, 3000)
        );
      }
    } catch (error) {
      setPublishingResults(false);
      setShowModal(!showModal);
      setShowAlert(
        {
          show: true,
          message: "An error occurred while Publishing Student Results",
          type: "danger",
        },
        setTimeout(() => {
          setShowAlert({ show: false, message: "", type: "" });
        }, 3000)
      );
      console.error("Error:", error);
    }
  };

  // handle unpublish results
  const handleUnpublishResults = async () => {
    setPublishingResults(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/unpublishResultSummaries/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(computedResults),
        }
      );

      if (response.ok) {
        setComputedResults((prevResults) =>
          prevResults.map((result) => ({
            ...result,
            published: false,
          }))
        );
        setPublishingResults(false);
        setShowModal(!showModal);
        setShowAlert(
          {
            show: true,
            message: "Results Unpublished Successfully",
            type: "success",
          },
          setTimeout(() => {
            setShowAlert({ show: false, message: "", type: "" });
          }, 3000)
        );
      }
    } catch (error) {
      setPublishingResults(false);
      setShowModal(!showModal);
      setShowAlert(
        {
          show: true,
          message: "An error occurred while Unpublishing Student Results",
          type: "danger",
        },
        setTimeout(() => {
          setShowAlert({ show: false, message: "", type: "" });
        }, 3000)
      );
      console.error("Error:", error);
    }
  };

  const refreshData = () => {
    if (
      classresultcredential.school_id &&
      classresultcredential.class_id &&
      classresultcredential.term_id &&
      classresultcredential.session_id
    ) {
      fetchResults();
    }
  };

  return (
    <>
      <PageTitle pathname={"Termly Result"} />
      <div className="row mt-4 justify-content-between">
        <h3 className="mt-3">{className} Class Result </h3>
        <p className="mb-3">
          Compute the results of the students in this class
        </p>
        <div className="col-md-7 mb-4 mb-md-0">
          {computedResults[0] && computedResults[0].published ? (
            <div className="published-successful-indicator badge rounded-pill p-2 px-3">
              <span>
                <FaCheck className={"me-2"} />
                Published
              </span>
            </div>
          ) : (
            <div className="published-unsuccessful-indicator badge rounded-pill p-2 px-3">
              <span>
                <FaTimes className={"me-2"} />
                Not Published
              </span>
            </div>
          )}
        </div>
        {computedResults && computedResults.length > 0 ? (
          <div className="col-md-3 mb-3 mb-md-0 d-flex flex-column align-items-end justify-content-center">
            <button
              style={{ fontWeight: 500 }}
              className="btn btn-accent-primary w-100"
              onClick={() => setShowModal(true)}
            >
              <TiArrowForward className="me-2 mb-1" />
              {computedResults[0] && computedResults[0].published
                ? "Unpublish Results"
                : "Publish Results"}{" "}
            </button>
          </div>
        ) : null}
      </div>

      {/* Result Datatable */}
      <div className="mt-3">
        {showAlert.show && (
          <Alert type={showAlert.type}>{showAlert.message}</Alert>
        )}
        <Datatable
          items={computedResults} //input the computed results here
          setItems={setResults}
        >
          <ClassResultDatatableitems
            refresh={refreshData}
            loading={loadingresults}
          />
        </Datatable>
      </div>

      {/* Class Credential Form */}
      <div className="row">
        <div className="col-md">
          <div className="card p-4 py-5 mt-3">
            <ClassResultcredentials
              handleSubmit={handleSubmit}
              loadingterms={loadingterms}
              loadingresults={loadingresults}
              schoolterms={schoolterms}
              schoolsessions={schoolsessions}
              setClassResultscredential={setClassResultscredential}
              classresultcredential={classresultcredential}
            />
          </div>
        </div>
        <div className="mt-3 col-md">
          <SubjectResultPublishedlist
            listofSubjectResultPublished={result[0]}
          />
        </div>
      </div>

      {/* Modal for Publishing Result */}
      <Modal showmodal={showModal} toggleModal={() => setShowModal(!showModal)}>
        <div>
          <p>
            are you sure you want to publish your students results, it will be
            open to them immediately you Publish
          </p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                computedResults[0] && computedResults[0].published
                  ? handleUnpublishResults()
                  : handlePublishResults();
              }}
              disabled={publishingResults}
            >
              {publishingResults ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  <span>
                    {computedResults[0] && computedResults[0].published
                      ? "Unpublishing Results"
                      : "Publishing Results"}
                  </span>
                </>
              ) : (
                <>
                  {computedResults[0] && computedResults[0].published
                    ? "Unpublish Results"
                    : "Publish Results"}
                </>
              )}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(!showModal)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Page;
