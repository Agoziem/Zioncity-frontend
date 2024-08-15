"use client";
import React, { createContext, useEffect, useState } from "react";

const AdminCBTContext = createContext();

const AdminCBTContextProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [test, setTest] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);

  // fetch tests
  // fetch subjects
  // fetch questions
  // fetch test
  return (
    <AdminCBTContext.Provider
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
    </AdminCBTContext.Provider>
  );
};
const useAdminCBTContext = () => React.useContext(AdminCBTContext);

export { useAdminCBTContext, AdminCBTContextProvider };
