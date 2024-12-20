"use client";
import React, { useContext, useEffect, useState } from "react";
import Datatable from "@/components/Datatable/Datatable";
import Datatableitems from "@/components/Datatable/Studentstableitems";
import Modal from "@/components/Modal/modal";
import PageTitle from "@/components/PageTitle/PageTitle";
import { SchoolContext } from "@/data/Schoolcontextdata";
import { TeacherContext } from "@/data/Teachercontextdata";
import { FaPlus } from "react-icons/fa6";
import "@/components/Modal/modal.css";
import Link from "next/link";
import "@/components/Datatable/Datatable.css";
import Alert from "@/components/Alert/Alert";
import useLocalStorage from "@/hooks/useLocalStorage";

const Page = () => {
  const { schoolData, academicsessions } = useContext(SchoolContext);
  const { teacherData } = useContext(TeacherContext);
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [storedcurrentSessionID, setStoredCurrentSessionID] = useLocalStorage(
    "currentSessionID",
    null
  );
  const [studenttodelete, setStudenttodelete] = useState({
    studentID: "",
    studentName: "",
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  let classID;
  let schoolID;
  let className;

  // --------------------------------------------------
  // set the IDs only if the Context data is available
  // --------------------------------------------------
  if (
    schoolData &&
    teacherData &&
    Object.keys(schoolData).length &&
    Object.keys(teacherData).length
  ) {
    schoolID = schoolData.id;
    classID = teacherData.classFormed.id;
    className = teacherData.classFormed.name;
  }

  // ----------------------------------------------------------------------
  // fetch the students on page load & when the ids are available or change
  // ----------------------------------------------------------------------
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/studentsapi/${schoolID}/${classID}/${storedcurrentSessionID}`
      );
      const jsonData = await response.json();
      setStudent(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schoolID && classID && storedcurrentSessionID) {
      fetchData();
    }
  }, [schoolID, classID, storedcurrentSessionID]);

  // -------------------------------------------
  // toogle Modal Function
  // -------------------------------------------
  const toggleModal = () => {
    setModal(!modal);
  };

  // -------------------------------------------
  // Delete Student Function
  // -------------------------------------------
  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const response = await fetch(`${DJANGO_URL}/studentsapi/delete/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setStudent((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
        setStudenttodelete({ studentID: "", studentName: "" });
        toggleModal();
        setShowAlert(
          {
            show: true,
            message: "Student deleted successfully",
            type: "success",
          },
          setTimeout(() => {
            setShowAlert({ show: false, message: "", type: "" });
          }, 3000)
        );
      }
    } catch (error) {
      setShowAlert(
        {
          show: true,
          message: "An error occurred, while deleting student",
          type: "danger",
        },
        setTimeout(() => {
          setShowAlert({ show: false, message: "", type: "" });
        }, 3000)
      );
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  // -------------------------------------------
  // Refresh Data Function
  // -------------------------------------------

  const refreshData = () => {
    if (schoolID && classID && storedcurrentSessionID) {
      fetchData();
    }
  };

  return (
    <>
      <PageTitle pathname={"Students"} />
      <div className="d-flex mt-4 mb-4 justify-content-between align-items-center">
        <div className="mb-2 mb-md-0">
          <h3>{className} Class List </h3>
        </div>
        <div className="d-flex">
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
          <Link
            style={{ fontWeight: 500 }}
            type="button"
            className="btn btn-primary px-5"
            href={`/teachers-portal/students/${classID}/create-student`}
          >
            <FaPlus className="me-2 mb-1" /> Add Student
          </Link>
        </div>
      </div>

      <div className="mt-3">
        {showAlert.show && (
          <Alert type={showAlert.type}>{showAlert.message}</Alert>
        )}
        <Datatable items={student} setItems={setStudent}>
          <Datatableitems
            refresh={refreshData}
            loading={loading}
            toggleModal={toggleModal}
            classID={classID}
            setStudenttodelete={setStudenttodelete}
          />
        </Datatable>
      </div>

      <Modal showmodal={modal} toggleModal={toggleModal}>
        <div>
          <p>Are you sure you want to delete {studenttodelete.studentName}?</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger me-3"
              disabled={deleting}
              onClick={() => handleDelete(studenttodelete.studentID)}
            >
              {deleting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  <span>deleting student ...</span>
                </>
              ) : (
                "Delete Student"
              )}
            </button>
            <button className="btn btn-secondary" onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Page;
