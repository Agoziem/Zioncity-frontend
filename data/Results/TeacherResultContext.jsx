"use client";
import React, { createContext, useEffect, useState } from "react";

const TeachersResultContext = createContext();

const TeachersResultContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  const [results, setResults] = useState([]);
  const [Annualresults, setAnnualresults] = useState([]);
  

  //  TEACHERS & FORM TECAHERS
  // ---------------------------------------------------------------
  // fetch Results by resultdetails(Class, Term, Session, Subject)
  // ---------------------------------------------------------------
  const fetchResults = async (resultcredential) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/getResults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultcredential),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        throw new Error("Failed to fetch Results");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------------------------------
  // fetch Annual Results by Class, Session, Subject
  // ---------------------------------------------------------------
  const fetchAnnualResults = async (resultcredential) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/getAnnualResults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultcredential),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAnnualresults(data);
      } else {
        throw new Error("Failed to fetch Annual Results");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------------------------------
  // submit termly result
  // --------------------------------------------------------
  const submitResult = async (endpoint, computedResults) => {
    try {
      const response = await fetch(
        endpoint,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(computedResults),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to publish result");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------------------------------
  // submit annual result
  // --------------------------------------------------------
  const submitAnnualResult = async (endpoint, computedAnnualResults) => {
    try {
      const response = await fetch(
        endpoint,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(computedAnnualResults),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to publish result");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <TeachersResultContext.Provider
      value={{
        schoolID,
        results,
        setResults,
        Annualresults,
        setAnnualresults,
        fetchResults,
        fetchAnnualResults,
        submitResult,
        submitAnnualResult
      }}
    >
      {children}
    </TeachersResultContext.Provider>
  );
};
const useTeachersResultContext = () => React.useContext(TeachersResultContext);

export { useTeachersResultContext, TeachersResultContextProvider };
