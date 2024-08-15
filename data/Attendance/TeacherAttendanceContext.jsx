"use client";
import React, { createContext, useEffect, useState } from "react";

const TeacherAttendanceContext = createContext();

const TeacherAttendanceContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <TeacherAttendanceContext.Provider
      value={{
      }}
    >
      {children}
    </TeacherAttendanceContext.Provider>
  );
};
const useTeacherAttendanceContext = () => React.useContext(TeacherAttendanceContext);

export { useTeacherAttendanceContext, TeacherAttendanceContextProvider };
