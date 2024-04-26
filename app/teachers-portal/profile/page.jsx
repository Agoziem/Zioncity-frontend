"use client";
import React, { useContext, useState } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import ProfileCard from "@/components/TeachersdetailsCard/ProfileCard";
import { TeacherContext } from "@/data/Teachercontextdata";
import ProfileEditForm from "@/components/TeachersdetailsCard/ProfileEditForm";
import { SchoolContext } from "@/data/Schoolcontextdata";
import useLocalStorage from "@/hooks/useLocalStorage";

const ProfilePage = () => {
  const { teacherData, setTeacherData } = useContext(TeacherContext);
  const [storedteacherData, setStoredTeacherData] = useLocalStorage(
    "teacherData",
    teacherData
  );
  const { schoolData } = useContext(SchoolContext);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: "",
    message: "",
  });
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        `${DJANGO_URL}/teachersapi/update/${teacherData.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherData),
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        setTeacherData(data);
        setStoredTeacherData(data);
        setEditMode(false);
        setShowAlert(
          {
            show: true,
            type: "success",
            message: "Profile updated successfully",
          },
          setTimeout(() => {
            setShowAlert({ show: false, type: "", message: "" });
          }, 3000)
        );
      }
    } catch (error) {
      setShowAlert(
        {
          show: true,
          type: "danger",
          message: "Something went wrong! Please try again.",
        },
        setTimeout(() => {
          setShowAlert({ show: false, type: "", message: "" });
        }, 3000)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageTitle pathname={"Teacher's Profile"} />
      <div>
        {editMode ? (
          <ProfileEditForm
            showAlert={showAlert}
            teacherData={teacherData}
            setTeacherData={setTeacherData}
            handleSubmit={handleSubmit}
            setEditMode={setEditMode}
            schoolData={schoolData}
            submitting={submitting}
          />
        ) : (
          <ProfileCard
            showAlert={showAlert}
            teacherData={teacherData}
            setEditMode={setEditMode}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePage;
