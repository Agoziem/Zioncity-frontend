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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("teacherdata", teacherData);
    setEditMode(false);
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
          />
        ) : (
          <ProfileCard teacherData={teacherData} setEditMode={setEditMode} />
        )}
      </div>
    </>
  );
};

export default page;
