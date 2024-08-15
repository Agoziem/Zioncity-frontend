"use client";
import React, { createContext, useEffect, useState } from "react";

const StudentsGPTContext = createContext();

const StudentsGPTContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <StudentsGPTContext.Provider
      value={{
      }}
    >
      {children}
    </StudentsGPTContext.Provider>
  );
};
const useStudentsGPTContext = () => React.useContext(StudentsGPTContext);

export { useStudentsGPTContext, StudentsGPTContextProvider };
