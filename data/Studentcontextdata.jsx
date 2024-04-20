"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getDataOrDefault, storeData } from '@/utils/Localstoragehandler';

const StudentsContext = createContext();

const StudentsContextProvider = ({ children }) => {
  const [StudentData, setStudentData] = useState(
    {
      "id": 10,
      "user": {
        "id": 28,
        "username": "@EkwunifeChidimma6028"
      },
      "studentclass": {
        "id": 3,
        "class_": "Jss1C"
      },
      "student_school": {
        "id": 2,
        "school": "Kings College"
      },
      "firstname": "Chidimma",
      "surname": "Ekwunife",
      "othername": "",
      "sex": "Female",
      "student_id": "smss/6028",
      "role": "Student",
      "headshot": null
    }
  );

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