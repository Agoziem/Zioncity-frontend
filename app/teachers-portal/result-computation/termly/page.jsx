"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import { SchoolContext } from "@/data/Schoolcontextdata";
import { TeacherContext } from "@/data/Teachercontextdata";
import { TiArrowForward } from "react-icons/ti";
import useLocalStorage from "@/hooks/useLocalStorage";
import { FaCheck, FaTimes } from "react-icons/fa";
import "@/components/Modal/modal.css";
import "@/components/Datatable/Datatable.css";
import Datatable from "@/components/Datatable/Datatable";
import ResultDatatableitems from "@/components/Datatable/Resulttableitems";
import Resultcredentials from "@/components/form/Resultcredentials";
import Notofferingresultlist from "@/components/Datatable/Notofferingresultlist";
import calculateStudentResults from "@/utils/studentResulthandler";
import Alert from "@/components/Alert/Alert";
import Modal from "@/components/Modal/modal";

const TermlyResultPage = () => {
  const [selectedClassName, setSelectedClassName] = useState(null);
  const { schoolData, academicsessions } = useContext(SchoolContext);
  const { teacherData } = useContext(TeacherContext);
  const [terms, setTerms] = useState([]);
  const [result, setResults] = useState([]);
  const [studentsnotoffering, setStudentsNotOffering] = useState([]);
  const [studentsoffering, setStudentsOffering] = useState([]);
  const [computedResults, setComputedResults] = useState([]);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);

  const [resultcredential, setResultscredential] = useState({
    term_id: "",
    session_id: "",
    class_id: "",
    school_id: "",
    subject_id: "",
  });
  const [loadingterms, setLoadingterms] = useState(false);
  const [loadingresults, setLoadingResults] = useState(false);
  const [publishingResults, setPublishingResults] = useState(false);
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  // ----------------------------------------------------------------------
  // Set the Result Credentials
  // ----------------------------------------------------------------------
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

  // update the Result Credential from the local storage or set new one
  const [storedCredentialValue, setValue] = useLocalStorage(
    "resultcredential",
    resultcredential
  );
  useEffect(() => {
    setResultscredential(storedCredentialValue);
  }, []);

  // update the Result Credential with School ID when the schoolID is set
  useEffect(() => {
    if (schoolData.id)
      setResultscredential((prevCredential) => ({
        ...prevCredential,
        school_id: schoolData.id,
      }));
  }, [schoolData.id]);

  // Fetch the Results when the result credential is set
  useEffect(() => {
    if (
      resultcredential.school_id &&
      resultcredential.class_id &&
      resultcredential.term_id &&
      resultcredential.session_id &&
      resultcredential.subject_id
    ) {
      fetchResults();
    }
  }, [resultcredential.school_id]);

  // fetch Class Result after the result credential is set
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(resultcredential);
    fetchResults();
  };

  // ----------------------------------------------------------------
  // fetch the Results of the Students in a class
  // ----------------------------------------------------------------
  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch(`${DJANGO_URL}/resultapi/getResults/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultcredential),
      });
      const jsonData = await response.json();
      setResults(jsonData);
    } catch (error) {
      setResults([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoadingResults(false);
    }
  };

  // ------------------------------------------------------------------
  // Toggle the offering status of a Student for the Subject
  // ------------------------------------------------------------------
  const toggleOfferingStatus = async (itemId) => {
    const itemToUpdate = result.find((item) => item.id === itemId);
    const newStatus = !itemToUpdate.is_offering;
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/updateResult/${itemId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_offering: newStatus }),
        }
      );

      if (response.ok) {
        // update the result in the frontend
        setResults((prevResults) =>
          prevResults.map((result) =>
            result.id === itemId
              ? { ...result, is_offering: newStatus }
              : result
          )
        );
      } else {
        console.error("Failed to update result in the backend");
      }
    } catch (error) {
      console.error("Error updating result:", error);
    }
  };

  // ------------------------------------------------------------------
  // Compute the results of the students
  // ------------------------------------------------------------------
  useEffect(() => {
    if (result.length > 0) {
      const calculatedResults = calculateStudentResults(result);
      const offeringStudents = calculatedResults.filter(
        (item) => item.is_offering
      );
      const notOfferingStudents = calculatedResults.filter(
        (item) => !item.is_offering
      );
      setStudentsOffering(offeringStudents);
      setStudentsNotOffering(notOfferingStudents);
      setComputedResults(calculatedResults);
    } else {
      setComputedResults([]);
      setStudentsNotOffering([]);
      setStudentsOffering([]);
    }
  }, [result]);

  // ------------------------------------------------------------------
  // Publish or Unpublish the computed results
  // ------------------------------------------------------------------
  const handlePublishOrUnpublishResults = async (publish) => {
    setPublishingResults(true);
    const endpoint = publish
      ? `${DJANGO_URL}/resultapi/postResults/`
      : `${DJANGO_URL}/resultapi/unpublishResults/`;
    const successMessage = publish
      ? "Results Published Successfully"
      : "Results Unpublished Successfully";
    const errorMessage = publish
      ? "Results not Published, an error occured. Try Again"
      : "Results not Unpublished, an error occured. Try Again";

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(computedResults),
      });

      if (response.ok) {
        setComputedResults((prevResults) =>
          prevResults.map((result) => ({
            ...result,
            published: publish,
          }))
        );
        setPublishingResults(false);
        setShowModal(!showModal);
        setShowAlert(
          {
            show: true,
            type: "success",
            message: successMessage,
          },
          setTimeout(() => {
            setShowAlert({ show: false, type: "", message: "" });
          }, 3000)
        );
      }
    } catch (error) {
      setPublishingResults(false);
      setShowModal(!showModal);
      setShowAlert(
        {
          show: true,
          type: "danger",
          message: errorMessage,
        },
        setTimeout(() => {
          setShowAlert({ show: false, type: "", message: "" });
        }, 3000)
      );
      console.error(
        "Error:",
        publish ? "publishing" : "unpublishing",
        "results:",
        error
      );
    }
  };

  // -----------------------------------------------------------------
  // Refresh Result
  // -----------------------------------------------------------------
  const refresh = () => {
    if (
      resultcredential.school_id &&
      resultcredential.class_id &&
      resultcredential.term_id &&
      resultcredential.session_id &&
      resultcredential.subject_id
    ) {
      fetchResults();
    }
  };

  return (
    <>
      <PageTitle pathname={"Termly Result"} />
      <h3>{selectedClassName} Student Result </h3>
      <p className="mb-3">
        compute Student results for your Subject and Class and publish it to the
        formteacher
      </p>
      <div className="row mt-3 justify-content-between">
        <div className="col-md-5 mb-4 mb-md-0">
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
          <div className="col-md-3 d-flex flex-column align-items-end justify-content-center">
            <button
              style={{ fontWeight: 500 }}
              className="btn btn-accent-primary w-100 w-md-50 mb-3"
              onClick={() => setShowModal(!showModal)}
            >
              <TiArrowForward className="me-2 mb-1 h5" />
              {computedResults[0] && computedResults[0].published
                ? "unpublish  Results"
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
        <Datatable items={studentsoffering} setItems={setStudentsOffering}>
          <ResultDatatableitems
            refresh={refresh}
            loading={loadingresults}
            toggleOfferingStatus={toggleOfferingStatus}
          />
        </Datatable>
      </div>

      {/* result Credential Form & those offering the Subject */}
      <div className="row">
        <div className="mt-3 me-4 col-md">
          <Resultcredentials
            handleSubmit={handleSubmit}
            loadingresults={loadingresults}
            resultcredential={resultcredential}
            setResultscredential={setResultscredential}
            schoolsessions={academicsessions}
            teachersclasses={teacherData.classes_taught}
            teachersubjects={teacherData.subjects_taught}
            schoolterms={terms}
          />
        </div>
        <div className="mt-3 col-md">
          <Notofferingresultlist
            loading={loadingresults}
            listofstudentsnotoffering={studentsnotoffering}
            toggleOfferingStatus={toggleOfferingStatus}
          />
        </div>
      </div>

      {/* Modal for Publishing Result */}
      <Modal showmodal={showModal} toggleModal={() => setShowModal(!showModal)}>
        <div>
          {computedResults[0] && computedResults[0].published ? (
            <p>
              {" "}
              are you sure you want to unpublish your students results, it will
              no longer be accessible to the formteacher
            </p>
          ) : (
            <p>
              {" "}
              are you sure you want to publish your students results, it will be
              opened to the formteacher for Review before final Publishing{" "}
            </p>
          )}
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                computedResults[0] && computedResults[0].published
                  ? handlePublishOrUnpublishResults(false)
                  : handlePublishOrUnpublishResults(true);
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

export default TermlyResultPage;
