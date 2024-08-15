"use client";
import React, { createContext, useEffect, useState } from "react";

const SchoolScheduleContext = createContext();

const SchoolScheduleContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <SchoolScheduleContext.Provider
      value={{
      }}
    >
      {children}
    </SchoolScheduleContext.Provider>
  );
};
const useSchoolScheduleContext = () => React.useContext(SchoolScheduleContext);

export { useSchoolScheduleContext, SchoolScheduleContextProvider };
