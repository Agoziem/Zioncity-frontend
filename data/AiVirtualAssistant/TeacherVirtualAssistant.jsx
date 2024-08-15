"use client";
import React, { createContext, useEffect, useState } from "react";

const TeacherVirtualAssistantContext = createContext();

const TeacherVirtualAssistantContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <TeacherVirtualAssistantContext.Provider
      value={{
      }}
    >
      {children}
    </TeacherVirtualAssistantContext.Provider>
  );
};
const useTeacherVirtualAssistantContext = () => React.useContext(TeacherVirtualAssistantContext);

export { useTeacherVirtualAssistantContext, TeacherVirtualAssistantContextProvider };
