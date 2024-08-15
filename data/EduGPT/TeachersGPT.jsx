"use client";
import React, { createContext, useEffect, useState } from "react";

const TeachersGPTContext = createContext();

const TeachersGPTContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <TeachersGPTContext.Provider
      value={{}}
    >
      {children}
    </TeachersGPTContext.Provider>
  );
};
const useTeachersGPTContext = () => React.useContext(TeachersGPTContext);

export { useTeachersGPTContext, TeachersGPTContextProvider };
