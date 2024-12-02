"use client";
import React, { createContext, useEffect, useState } from "react";
// import useLocalStorage from '@/hooks/useLocalStorage';
const SchoolContext = createContext();

const SchoolContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  const [schoolData, setSchoolData] = useState({});
  const [academicsessions, setAcademicSessions] = useState([]);

  useEffect(() => {
    if (schoolID) {
      fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/adminsapi/schools/${schoolID}/`
      )
        .then((res) => res.json())
        .then((data) => {
          setSchoolData(data);
        });
    }
  }, [schoolID]);
  
  // fetch Academic Session
  useEffect(() => {
    if (schoolID) {
      fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/adminsapi/academicsessions/`
      )
        .then((res) => res.json())
        .then((data) => {
          setAcademicSessions(data);
        });
    }
  }, [schoolID]);

  return (
    <SchoolContext.Provider
      value={{ schoolData, setSchoolData, setSchoolID, academicsessions }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export { SchoolContext, SchoolContextProvider };
