"use client";
import React, { createContext, useEffect, useState } from "react";

const StudentAdmissionContext = createContext();

const StudentAdmissionContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);

  return (
    <StudentAdmissionContext.Provider value={{}}>{children}</StudentAdmissionContext.Provider>
  );
};
const useStudentAdmissionContext = () => React.useContext(StudentAdmissionContext);

export { useStudentAdmissionContext, StudentAdmissionContextProvider };
