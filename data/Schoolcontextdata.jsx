"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getDataOrDefault, storeData } from '@/utils/Localstoragehandler';
const SchoolContext = createContext();

const SchoolContextProvider = ({ children }) => {
  const [schoolData, setSchoolData] = useState({
    "id": 2,
    "sessions": [
      {
        "id": 2,
        "session": "2022/2021"
      },
      {
        "id": 3,
        "session": "2023/2024"
      }
    ],
    "classes": [
      {
        "id": 1,
        "class": "Jss1A"
      },
      {
        "id": 2,
        "class": "Jss1B"
      },
      {
        "id": 3,
        "class": "Jss1C"
      }
    ],
    "subjects": [
      {
        "id": 1,
        "subject": "Mathematics"
      },
      {
        "id": 2,
        "subject": "English"
      },
      {
        "id": 3,
        "subject": "Igbo Language"
      },
      {
        "id": 4,
        "subject": "Agriculture"
      }
    ],
    "Schoollogo": null,
    "Schoolname": "Kings College",
    "Schoolofficialline": "08012345678",
    "Schoolmotto": "Education for all",
    "Schoollocation": "Lagos",
    "Emailaddress": "kingscollege@gmail.com",
    "Facebookpage": "kingscollege",
    "Twitterhandle": "kingscollege",
    "Whatsapplink": ""
  });

  useEffect(() => {
    setSchoolData(getDataOrDefault('schoolData', {}));
  }, []);

  useEffect(() => {
    storeData('schoolData', schoolData);
  }, [schoolData]);


  return (
    <SchoolContext.Provider value={{ schoolData, setSchoolData }}>
      {children}
    </SchoolContext.Provider>
  );
};

export { SchoolContext, SchoolContextProvider };
