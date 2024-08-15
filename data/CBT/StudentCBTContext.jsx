"use client";
import React, { createContext, useEffect, useState } from "react";

const StudentCBTContext = createContext();

const StudentCBTContextProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [test, setTest] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);

  // fetch tests
  // fetch subjects
  // fetch questions
  // fetch test
  return (
    <StudentCBTContext.Provider
      value={{
        tests,
        setTests,
        test,
        setTest,
        subjects,
        setSubjects,
        questions,
        setQuestions,
      }}
    >
      {children}
    </StudentCBTContext.Provider>
  );
};
const useStudentCBTContext = () => React.useContext(StudentCBTContext);

export { useStudentCBTContext, StudentCBTContextProvider };