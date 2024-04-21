"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const StudentsContext = createContext();

const StudentsContextProvider = ({ children }) => {
  const [StudentData, setStudentData] = useState(
    {
      "id": 13,
      "user": {
        "id": 31,
        "username": "@OgbujiChinaza7588"
      },
      "studentclass": {
        "id": 2,
        "class_": "Jss1B"
      },
      "student_school": {
        "id": 2,
        "school": "Kings College"
      },
      "firstname": "Chinaza",
      "surname": "Ogbuji",
      "othername": "",
      "sex": "Female",
      "student_id": "smss/7588",
      "role": "Student",
      "headshot": null
    }
  );


  const [storedStudentData, setStoredStudentData] = useLocalStorage('StudentData', StudentData)

  useEffect(() => {
    if (storedStudentData) {
      setStudentData(storedStudentData)
    }
  }, [storedStudentData])

  useEffect(() => {
    setStoredStudentData('StudentData', StudentData);
  }, [StudentData]);


  // Step 4: Provide the context value to children components
  return (
    <StudentsContext.Provider value={{ StudentData, setStudentData }}>
      {children}
    </StudentsContext.Provider>
  );
};

export { StudentsContext, StudentsContextProvider };