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



  // Step 4: Provide the context value to children components
  return (
    <StudentsContext.Provider value={{ StudentData, setStudentData }}>
      {children}
    </StudentsContext.Provider>
  );
};

export { StudentsContext, StudentsContextProvider };