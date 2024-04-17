"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getDataOrDefault, storeData } from '@/utils/Localstoragehandler';
const TeacherContext = createContext();

const TeacherContextProvider = ({ children }) => {
  const [teacherData, setTeacherData] = useState({
    "id": 5,
    "user": {
      "id": 15,
      "username": "@NdukweWinner9723"
    },
    "classes_taught": [
      {
        "id": 2,
        "name": "Jss1B"
      },
      {
        "id": 3,
        "name": "Jss1C"
      }
    ],
    "subjects_taught": [
      {
        "id": 2,
        "name": "English"
      },
      {
        "id": 3,
        "name": "Igbo Language"
      }
    ],
    "school": {
      "id": 2,
      "name": "Kings College"
    },
    "classFormed": {
      "id": 2,
      "name": "Jss1B"
    },
    "firstName": "Ndukwe",
    "surname": "Winner",
    "sex": "",
    "phone_number": "08012345678",
    "email": "ndukwekosiso@gmail.com",
    "teachers_id": "teacher/9723",
    "role": "Formteacher",
    "is_formteacher": true,
    "headshot": null
  });

  useEffect(() => {
    const teacherData = getDataOrDefault('teacherData', {});
    setTeacherData(teacherData);
  }, []);

  useEffect(() => {
    storeData('teacherData', teacherData);
  }, [teacherData]);

  // Step 4: Provide the context value to children components
  return (
    <TeacherContext.Provider value={{ teacherData, setTeacherData }}>
      {children}
    </TeacherContext.Provider>
  );
};
//

export { TeacherContext, TeacherContextProvider };
