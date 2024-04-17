"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getDataOrDefault, storeData } from '@/utils/Localstoragehandler';

const StudentsContext = createContext();

const StudentsContextProvider = ({ children }) => {
  const [StudentData, setStudentData] = useState({});

  useEffect(() => {
    setStudentData(getDataOrDefault('StudentData', {}));
  }, []);

  useEffect(() => {
    storeData('StudentData', StudentData);
  }, [StudentData]);


  // Step 4: Provide the context value to children components
  return (
    <StudentsContext.Provider value={{ StudentData, setStudentData }}>
      {children}
    </StudentsContext.Provider>
  );
};

export { StudentsContext, StudentsContextProvider };