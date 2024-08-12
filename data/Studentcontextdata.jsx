"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const StudentsContext = createContext();

const StudentsContextProvider = ({ children }) => {
  const [StudentData, setStudentData] = useState({});


  const [storedStudentData, setStoredStudentData] = useLocalStorage('StudentData', StudentData)

  useEffect(() => {
    if (storedStudentData) {
      setStudentData(storedStudentData)
    }
  }, [storedStudentData])

  // function to fetch all Students data paginated
  // function to fetch Students data by Class
  // function to fetch Student data by ID
  // function to update Student data
  // function to delete Student data


  // Step 4: Provide the context value to children components
  return (
    <StudentsContext.Provider value={{ StudentData, setStudentData }}>
      {children}
    </StudentsContext.Provider>
  );
};

export { StudentsContext, StudentsContextProvider };