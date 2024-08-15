"use client";
import React, { createContext, useEffect, useState } from "react";

const AdminVirtualAssistantContext = createContext();

const AdminVirtualAssistantContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <AdminVirtualAssistantContext.Provider
      value={{
      }}
    >
      {children}
    </AdminVirtualAssistantContext.Provider>
  );
};
const useAdminVirtualAssistantContext = () => React.useContext(AdminVirtualAssistantContext);

export { useAdminVirtualAssistantContext, AdminVirtualAssistantContextProvider };
