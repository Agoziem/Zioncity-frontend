"use client";
import React, { useContext } from "react";
import { StudentsContext } from "@/data/Studentcontextdata";
import { SchoolContext } from "@/data/Schoolcontextdata";
import PageTitle from "@/components/PageTitle/PageTitle";
import StudentCards from "@/components/Cards/StudentCards";

const StudentPage = () => {
  const { schoolData } = useContext(SchoolContext);
  const { StudentData } = useContext(StudentsContext);

  return (
    <div>
      <PageTitle pathname={"Dashboard"} />
      <div className="mb-4">
        <h4>Welcome, {StudentData.firstname}</h4>
      </div>
      <StudentCards studentData={StudentData} schoolData={schoolData} />
    </div>
  );
};

export default StudentPage;
