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
  const [ storedteacherData, setStoredTeacherData ] = useLocalStorage("teacherData", teacherData);
  const { schoolData } = useContext(SchoolContext);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(teacherData)
    setSubmitting(true);
    try {
      const res = await fetch(`${DJANGO_URL}/teachersapi/update/${teacherData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log(data)
        setTeacherData(data);
        setStoredTeacherData(data);
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

export default ProfilePage;
