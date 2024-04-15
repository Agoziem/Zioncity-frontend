"use client";
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';

const SchoolContext = createContext();

const SchoolContextProvider = ({ children }) => {
  const [schoolData, setSchoolData] = useState({});
  const [ updatedschoolData,setData ] = useLocalStorage('schoolData', {});


  useEffect(() => {
    if (Object.keys(updatedschoolData).length) {
      setSchoolData(updatedschoolData);
    }
  } , [updatedschoolData]);

  const updateSchoolData = (newData) => {
    setSchoolData(newData);
  };

  return (
    <SchoolContext.Provider value={{ schoolData, updateSchoolData }}>
      {children}
    </SchoolContext.Provider>
  );
};

export { SchoolContext, SchoolContextProvider };
