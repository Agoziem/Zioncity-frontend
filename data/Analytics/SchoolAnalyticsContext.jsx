"use client";
import React, { createContext, useEffect, useState } from "react";

const SchoolAnalyticsContext = createContext();

const SchoolAnalyticsContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <SchoolAnalyticsContext.Provider
      value={{
      }}
    >
      {children}
    </SchoolAnalyticsContext.Provider>
  );
};
const useSchoolAnalyticsContext = () => React.useContext(SchoolAnalyticsContext);

export { useSchoolAnalyticsContext, SchoolAnalyticsContextProvider };
