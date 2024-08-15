"use client";
import React, { createContext, useEffect, useState } from "react";

const AdminAdmissionContext = createContext();

const AdminAdmissionContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);

  return (
    <AdminAdmissionContext.Provider value={{}}>{children}</AdminAdmissionContext.Provider>
  );
};
const useAdminAdmissionContext = () => React.useContext(AdminAdmissionContext);

export { useAdminAdmissionContext, AdminAdmissionContextProvider };
