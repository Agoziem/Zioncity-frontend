"use client";
import React, { createContext, useEffect, useState } from "react";

const StudyScheduleContext = createContext();

const StudyScheduleContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <StudyScheduleContext.Provider
      value={{
      }}
    >
      {children}
    </StudyScheduleContext.Provider>
  );
};
const useStudyScheduleContext = () => React.useContext(StudyScheduleContext);

export { useStudyScheduleContext, StudyScheduleContextProvider };
