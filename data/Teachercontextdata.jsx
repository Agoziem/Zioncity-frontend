"use client";
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';

const TeacherContext = createContext();

const TeacherContextProvider = ({ children }) => {
  const [teacherData, setteacherData] = useState({});
  const [ updatedteacherData,setData ] = useLocalStorage('teacherData', {});
 
  useEffect(() => {
    if (Object.keys(updatedteacherData).length) {
      setteacherData(updatedteacherData);
    }
  },[updatedteacherData]);

  const updateAdminData = (newData) => {
    setteacherData(newData);
  };

  // Step 4: Provide the context value to children components
  return (
    <TeacherContext.Provider value={{ teacherData, updateAdminData }}>
      {children}
    </TeacherContext.Provider>
  );
};

export { TeacherContext, TeacherContextProvider };
