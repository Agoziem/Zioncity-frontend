"use client";
import React, { useContext, useState } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import Form from "@/components/form/Form";
import { useRouter } from "next/navigation";
import { SchoolContext } from "@/data/Schoolcontextdata";
import useLocalStorage from "@/hooks/useLocalStorage";

const CreateStudent = ({ params }) => {
  const [student, setStudent] = useState({
    firstname: "",
    surname: "",
    sex: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const classID = params.classID;
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;
  const { schoolData } = useContext(SchoolContext);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [storedcurrentSessionID] = useLocalStorage("currentSessionID", null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!storedcurrentSessionID) return;
    try {
      const response = await fetch(
        `${DJANGO_URL}/studentsapi/create/${schoolData.id}/${classID}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            academic_session: storedcurrentSessionID,
            firstname: student.firstname,
            surname: student.surname,
            sex: student.sex,
          }),
        }
      );
      if (response.ok) {
        setShowAlert(
          {
            show: true,
            message: "Student created successfully",
            type: "success",
          },
          setTimeout(() => {
            setShowAlert({ show: false, message: "", type: "" });
          }, 3000)
        );
        router.push("/teachers-portal/students");
      }
    } catch (error) {
      setShowAlert(
        {
          show: true,
          message: "An error occurred, while creating student",
          type: "danger",
        },
        setTimeout(() => {
          setShowAlert({ show: false, message: "", type: "" });
        }, 3000)
      );
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageTitle pathname={"Students"} />
      <div className="row justify-content-center">
        <div className="col-md-7">
          <Form
            showAlert={showAlert}
            type={"create"}
            student={student}
            setStudent={setStudent}
            submitting={submitting}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
