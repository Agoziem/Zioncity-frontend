"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const TeacherContext = createContext();

const TeacherContextProvider = ({ children }) => {
  const [teacherData, setTeacherData] = useState({});


  const [storedTeacherData, setStoredTeacherData] = useLocalStorage('teacherData', teacherData)

  useEffect(() => {
    if (storedTeacherData) {
      setTeacherData(storedTeacherData)
    }
  }, [storedTeacherData])

  

  // Step 4: Provide the context value to children components
  return (
    <TeacherContext.Provider value={{ teacherData, setTeacherData }}>
      {children}
    </TeacherContext.Provider>
  );
};
//

export { TeacherContext, TeacherContextProvider };
