"use client";
import React, { createContext, useEffect, useState } from "react";

const PerformanceAnalyticsContext = createContext();

const PerformanceAnalyticsContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <PerformanceAnalyticsContext.Provider
      value={{
      }}
    >
      {children}
    </PerformanceAnalyticsContext.Provider>
  );
};
const usePerformanceAnalyticsContext = () => React.useContext(PerformanceAnalyticsContext);

export { usePerformanceAnalyticsContext, PerformanceAnalyticsContextProvider };
