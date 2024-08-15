"use client";
import React, { createContext, useEffect, useState } from "react";

const StudentResultsContext = createContext();

const StudentResultsContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  const [result, setResult] = useState({}); // student full Result
  const [Annualresult, setAnnualresult] = useState({}); // student Annual Result
  
  // STUDENTS
  // --------------------------------------------------------------------------------------------
  // fetch full termly result for a Student using Student ID, Student Pin, Class, Term, Session
  // --------------------------------------------------------------------------------------------
  const fetchStudentResults = async () => {
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/getsubjectresults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultdetails),
        }
      );
      if (response.status === 404) {
        throw new Error("Invalid Credentials, Please try again");
      } else if (response.status === 400) {
        throw new Error(
          "Your Result have not been published yet, Please check back later"
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };


  // ---------------------------------------
  // fetch the Student Annual Result
  // ---------------------------------------
  const fetchAnnualResults = async (resultdetails) => {
    setLoadingResults(true);
    try {
      const response = await fetch(
        `${DJANGO_URL}/resultapi/getsubjectannualresults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultdetails),
        }
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <StudentResultsContext.Provider
      value={{
        result,
        setResult,
        Annualresult,
        setAnnualresult,
        schoolID,
        fetchAnnualResults,
        fetchStudentResults,
      }}
    >
      {children}
    </StudentResultsContext.Provider>
  );
};
const useStudentResultsContext = () => React.useContext(StudentResultsContext);

export { useStudentResultsContext, StudentResultsContextProvider };
