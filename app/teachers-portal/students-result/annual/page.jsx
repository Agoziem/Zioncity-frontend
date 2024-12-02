"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import { SchoolContext } from "@/data/Schoolcontextdata";
import { TeacherContext } from "@/data/Teachercontextdata";
import { TiArrowForward } from "react-icons/ti";
import { FaCheck, FaTimes } from "react-icons/fa";
import "@/components/Datatable/Datatable.css";
import Datatable from "@/components/Datatable/Datatable";
import ClassResultcredentials from "@/components/form/ClassResultcredentials";
import useLocalStorage from "@/hooks/useLocalStorage";
import AnnualClassResultHandler from "@/utils/AnnualClassResulthandler";
import SubjectResultPublishedlist from "@/components/Datatable/SubjectResultPublishedlist";
import Alert from "@/components/Alert/Alert";
import Modal from "@/components/Modal/modal";
import AnnualClassResultDatatableitems from "@/components/Datatable/AnnualClassResultTableitems";

const Page = () => {
  const { schoolData,academicsessions } = useContext(SchoolContext);
  const { teacherData } = useContext(TeacherContext);
  const [result, setResults] = useState([]);
  const [computedResults, setComputedResults] = useState([]);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [classresultcredential, setClassResultscredential] = useState({
    session_id: "",
    class_id: "",
    school_id: "",
  });

  const [loadingresults, setLoadingResults] = useState(false);
  const [publishingResults, setPublishingResults] = useState(false);
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  // ---------------------------------------------------------
  // update the Credentials with what is in the Local Storage
  // ---------------------------------------------------------
  const [storedClassCredentialValue, setClassCredentialValue] = useLocalStorage(
    "classresultcredential",
    classresultcredential
  );
  useEffect(() => {
    setClassResultscredential(storedClassCredentialValue);
  }, []);

  // ---------------------------------------------------------
  // set the needed data when they are available
  // ---------------------------------------------------------
  let schoolID;
  let classID;
  let className;

  if (
    schoolData &&
    teacherData &&
    Object.keys(schoolData).length &&
    Object.keys(teacherData).length
  ) {
    schoolID = schoolData.id || "";
    classID = teacherData.classFormed.id || "";
    className = teacherData.classFormed.name || "";
  }

  // ------------------------------------------------------------------------------------
  // update the result credentials when the school_id & class_id is available or changes
  // ------------------------------------------------------------------------------------
  useEffect(() => {
    if (schoolID && classID) {
      setClassResultscredential((prevCredential) => ({
        ...prevCredential,
        school_id: schoolID,
        class_id: classID,
      }));
    }
  }, [schoolID, classID]);

  // ---------------------------------------------------------------
  // Fetch the Results when the school_id is available on page load
  // ---------------------------------------------------------------
  useEffect(() => {
    if (
      classresultcredential.school_id &&
      classresultcredential.class_id &&
      classresultcredential.session_id
    ) {
      fetchResults();
    }
  }, [classresultcredential.school_id, classresultcredential.class_id]);

  // ---------------------------------------------------------------
  // store the credentials to the local storage & fetch the results
  // ---------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setClassCredentialValue(classresultcredential);
    fetchResults();
  };

  // ------------------------------------------------------------------------------------
  // fetch the Results of the Students in a class for a particular Subject in a Class
  // ------------------------------------------------------------------------------------
  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/getAnnualResultSummaries/`,
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

  // -------------------------------------------------------------------------
  // Compute the results by the passing it through the Student Result Computation Algorithm
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (result.length > 0 && result.every(student => student.subjects && student.subjects.length > 0)) { 
      const computedResults = AnnualClassResultHandler(result);
      setComputedResults(computedResults);
    }
  }, [result]);



  // ---------------------------------------------------------
  // handle Publish & Unpublish results
  // ---------------------------------------------------------
  const handlePublishOrUnpublishResults = async (publish) => {
    setPublishingResults(true);
    const endpoint = publish
      ? `${DJANGO_URL}/resultapi/postAnnualResultSummaries/`
      : `${DJANGO_URL}/resultapi/unpublishAnnualResultSummaries/`;
    const successMessage = publish
      ? "Results Published Successfully"
      : "Results Unpublished Successfully";
    const errorMessage = publish
      ? "An error occurred while Publishing Student Results"
      : "An error occurred while Unpublishing Student Results";

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
        setShowAlert({
          show: true,
          message: successMessage,
          type: "success",
        });
        setTimeout(() => {
          setShowAlert({ show: false, message: "", type: "" });
        }, 3000);
      }
    } catch (error) {
      setPublishingResults(false);
      setShowModal(!showModal);
      setShowAlert({
        show: true,
        message: errorMessage,
        type: "danger",
      });

      setTimeout(() => {
        setShowAlert({ show: false, message: "", type: "" });
      }, 3000);
      console.error("Error:", error);
    }
  };

  const refreshData = () => {
    if (
      classresultcredential.school_id &&
      classresultcredential.class_id &&
      classresultcredential.session_id
    ) {
      fetchResults();
    }
  };

  return (
    <>
      <PageTitle pathname={"Termly Result"} />
      <div className="row mt-4 justify-content-between">
        <h3 className="mt-3">{className} Annual Class Result </h3>
        <p className="mb-3">
          review your class annual results and Publish them to your Students
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
          <AnnualClassResultDatatableitems
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
              loadingresults={loadingresults}
              schoolsessions={academicsessions}
              setClassResultscredential={setClassResultscredential}
              classresultcredential={classresultcredential}
              isAnnual={true}
            />
          </div>
        </div>
        <div className="mt-3 col-md">
          <SubjectResultPublishedlist
            listofSubjectResultPublished={result[0]}
            isAnnual = {true}
          />
        </div>
      </div>

      {/* Modal for Publishing Result */}
      <Modal showmodal={showModal} toggleModal={() => setShowModal(!showModal)}>
        <div>
          {computedResults[0] && computedResults[0].published ? (
            <p>
              are you sure you want to retrieve your students Annual results, it will
              no longer be opened to them immediately you Unpublish
            </p>
          ) : (
            <p>
              are you sure you want to publish your students Annual results, it will be
              opened to them immediately you Publish
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

export default Page;
