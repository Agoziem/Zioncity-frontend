"use client";
import React, { createContext, useEffect, useState } from "react";

const AdminAttendanceContext = createContext();

const AdminAttendanceContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <AdminAttendanceContext.Provider
      value={{
      }}
    >
      {children}
    </AdminAttendanceContext.Provider>
  );
};
const useAdminAttendanceContext = () => React.useContext(AdminAttendanceContext);

export { useAdminAttendanceContext, AdminAttendanceContextProvider };
