"use client";
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';

const StudentsContext = createContext();

const StudentsContextProvider = ({ children }) => {
  const [StudentData, setStudentData] = useState({});
  const [ updatedStudentData,setData ] = useLocalStorage('StudentData', {});

  useEffect(() => {
    if (Object.keys(updatedStudentData).length) {
      setStudentData(updatedStudentData);
    }
  }, [updatedStudentData]);

  const updateStudentData = (newData) => {
    setStudentData(newData);
  };

  // Step 4: Provide the context value to children components
  return (
    <StudentsContext.Provider value={{ StudentData, updateStudentData }}>
      {children}
    </StudentsContext.Provider>
  );
};

export { StudentsContext, StudentsContextProvider };