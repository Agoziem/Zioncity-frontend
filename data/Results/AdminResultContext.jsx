"use client";
import React, { createContext, useEffect, useState } from "react";

const AdminsResultsContext = createContext();

const AdminsResultsContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  const [results, setResults] = useState([]);
  const [result, setResult] = useState({});
  const [Annualresult, setAnnualresult] = useState({});
  const [Annualresults, setAnnualresults] = useState([]);
  const [resultsummary, setResultsummary] = useState({});
  const [resultsummarys, setResultsummarys] = useState([]);
  const [Annualresultsummary, setAnnualresultsummary] = useState({});
  const [Annualresultsummarys, setAnnualresultsummarys] = useState([]);


  // ADMINS & SCHOOL OWNERS
  // --------------------------------------------------------
  // fetch all Results and paginated
  // --------------------------------------------------------
  const fetchAllResults = async (page = 1, pageSize = 20) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/termlyresults/${schoolID}?page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------------------------------
  // fetch all Annual Results
  // --------------------------------------------------------
  const fetchAllAnnualResults = async (page = 1, pageSize = 20) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/annualresults/${schoolID}?page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setAnnualresults(data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------------------------------
  // fetch Result by Student ID
  // --------------------------------------------------------
  const fetchResult = async (resultID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/result/${resultID}/`
      );
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // --------------------------------------------------------
  // fetch Result Summary by Student ID
  // --------------------------------------------------------
  const fetchResultSummary = async (resultID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/resultsummary/${resultID}/`
      );
      if (response.ok) {
        const data = await response.json();
        setResultsummary(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------------------------------
  // fetch Annual Result by Student ID
  // --------------------------------------------------------
  const fetchAnnualResult = async (resultID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/annualresult/${resultID}/`
      );
      if (response.ok) {
        const data = await response.json();
        setAnnualresult(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------------------------------
  // fetch Annual Result Summary by Student ID
  // --------------------------------------------------------
  const fetchAnnualResultSummary = async (resultID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/resultapi/annualresultsummary/${resultID}/`
      );
      if (response.ok) {
        const data = await response.json();
        setAnnualresultsummary(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminsResultsContext.Provider
      value={{
        results,
        setResults,
        result,
        setResult,
        Annualresult,
        setAnnualresult,
        Annualresults,
        setAnnualresults,
        resultsummary,
        setResultsummary,
        Annualresultsummary,
        setAnnualresultsummary,
        fetchAllResults,
        fetchAllAnnualResults,
        fetchResult,
        fetchResultSummary,
        fetchAnnualResult,
        fetchAnnualResultSummary,
      }}
    >
      {children}
    </AdminsResultsContext.Provider>
  );
};
const useAdminsResultsContext = () => React.useContext(AdminsResultsContext);

export { useAdminsResultsContext, AdminsResultsContextProvider };
