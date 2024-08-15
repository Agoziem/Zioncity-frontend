"use client";
import React, { createContext, useEffect, useState } from "react";

const NewStudentCBTContext = createContext();

const NewStudentCBTContextProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [test, setTest] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);

  // fetch tests
  // fetch subjects
  // fetch questions
  // fetch test
  return (
    <NewStudentCBTContext.Provider
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
    </NewStudentCBTContext.Provider>
  );
};
const useNewStudentCBTContext = () => React.useContext(NewStudentCBTContext);

export { useNewStudentCBTContext, NewStudentCBTContextProvider };