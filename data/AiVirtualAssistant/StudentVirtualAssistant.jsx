"use client";
import React, { createContext, useEffect, useState } from "react";

const StudentVirtualAssistantContext = createContext();

const StudentVirtualAssistantContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <StudentVirtualAssistantContext.Provider
      value={{
      }}
    >
      {children}
    </StudentVirtualAssistantContext.Provider>
  );
};
const useStudentVirtualAssistantContext = () => React.useContext(StudentVirtualAssistantContext);

export { useStudentVirtualAssistantContext, StudentVirtualAssistantContextProvider };
