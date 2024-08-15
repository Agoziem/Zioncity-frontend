"use client";
import React, { createContext, useEffect, useState } from "react";

const AlertsContext = createContext();

const AlertsContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <AlertsContext.Provider
      value={{
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};
const useAlertsContext = () => React.useContext(AlertsContext);

export { useAlertsContext, AlertsContextProvider };
