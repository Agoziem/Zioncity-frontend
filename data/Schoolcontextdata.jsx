"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
const SchoolContext = createContext();

const SchoolContextProvider = ({ children }) => {
  const [schoolID,setSchoolID] = useState(1)
  const [schoolData, setSchoolData] = useState({});

  useEffect(() => {
    if(schoolID){
      fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/adminsapi/schools/${schoolID}/`)
      .then((res) => res.json())
      .then((data) => {
        setSchoolData(data);
      });
    }
  }, [schoolID]);


  return (
    <SchoolContext.Provider value={{ schoolData, setSchoolData,setSchoolID }}>
      {children}
    </SchoolContext.Provider>
  );
};

export { SchoolContext, SchoolContextProvider };
