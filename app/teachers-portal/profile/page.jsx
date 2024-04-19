"use client";
import React, { useContext, useState } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import ProfileCard from "@/components/TeachersdetailsCard/ProfileCard";
import { TeacherContext } from "@/data/Teachercontextdata";
import ProfileEditForm from "@/components/TeachersdetailsCard/ProfileEditForm";
import { SchoolContext } from "@/data/Schoolcontextdata";

const page = () => {
  const { teacherData, setTeacherData } = useContext(TeacherContext);
  const { schoolData } = useContext(SchoolContext);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/teachersapi/update/${teacherData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });
      if (res.status === 200) {
        const data = await res.json();
        setEditMode(false);
      }
    } catch (error) {
      console.log(error)
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
            teacherData={teacherData}
            setTeacherData={setTeacherData}
            handleSubmit={handleSubmit}
            setEditMode={setEditMode}
            schoolData={schoolData}
            submitting={submitting}
          />
        ) : (
          <ProfileCard teacherData={teacherData} setEditMode={setEditMode} />
        )}
      </div>
    </>
  );
};

export default page;
