"use client";
import React, { createContext, useEffect, useState } from "react";

const AdminsGPTContext = createContext();

const AdminsGPTContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <AdminsGPTContext.Provider
      value={{
      }}
    >
      {children}
    </AdminsGPTContext.Provider>
  );
};
const useAdminsGPTContext = () => React.useContext(AdminsGPTContext);

export { useAdminsGPTContext, AdminsGPTContextProvider };
