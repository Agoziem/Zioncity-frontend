"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

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
        "id": 1,
        "name": "Jss1A"
      },
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
        "id": 1,
        "name": "Mathematics"
      },
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
    "headshot": "http://127.0.0.1:8000/media/assets/TeachersProfileimages/IMG_20230808_195658.jpg",
    "firstName": "Chiagoziem",
    "surname": "Ndukwe",
    "sex": "Female",
    "phone_number": "08080982606",
    "email": "chiagoziendukwe90@gmail.com",
    "teachers_id": "teacher/9723",
    "role": "Formteacher",
    "is_formteacher": true,
    "address": "No 2, Ojike Street, Awka, Anambra State",
  });


  const [storedTeacherData, setStoredTeacherData] = useLocalStorage('teacherData', teacherData)

  useEffect(() => {
    if (storedTeacherData) {
      setTeacherData(storedTeacherData)
    }
  }, [storedTeacherData])

  useEffect(() => {
    setStoredTeacherData('teacherData', teacherData);
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
