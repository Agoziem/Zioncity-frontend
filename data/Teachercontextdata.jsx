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

  // function to fetch all teachers data
  // function to fetch teacher data by Class
  // function to fetch teacher data by ID
  // function to update teacher data
  // function to delete teacher data

  // Step 4: Provide the context value to children components
  return (
    <TeacherContext.Provider value={{ teacherData, setTeacherData }}>
      {children}
    </TeacherContext.Provider>
  );
};
//

export { TeacherContext, TeacherContextProvider };
