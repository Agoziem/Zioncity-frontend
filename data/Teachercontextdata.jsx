"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const TeacherContext = createContext();

const TeacherContextProvider = ({ children }) => {
  const [schoolID,setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  const [teacherID,setTeacherID] = useState(null);
  const [teacherData, setTeacherData] = useState({});
  const [teachers, setTeachers] = useState([]);


  const [storedTeacherID, setStoredTeacherID] = useLocalStorage('teacherID', teacherID)

  useEffect(() => {
    if (storedTeacherID) {
      setTeacherID(storedTeacherID)
    }
  }, [storedTeacherID])

  // ------------------------------------------------
  // function to fetch all teachers
  // ------------------------------------------------
  const fetchAllTeachers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/teachersapi/${schoolID}/`
      );
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  // ------------------------------------------------
  // function to fetch teacher data by Class
  // ------------------------------------------------
  const fetchTeachersByClass = async (classID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/teachersapi/${schoolID}/${classID}/`
      );
      if (response.ok) {
        const data = await response.json();
        return data; //returns list of teachers in the class
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------------
  // function to fetch teacher data by ID
  // ------------------------------------------------
  const fetchTeacherByID = async (teacherID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/teachersapi/teacher/${teacherID}/`
      );
      if (response.ok) {
        const data = await response.json();
        return data; //returns teacher data
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (teacherID) {
      fetchTeacherByID(teacherID).then((data) => {
        setTeacherData(data);
      });
    }
  }, [teacherID]);

  // ------------------------------------------------
  // function to update teacher data
  // ------------------------------------------------
  const updateTeacherData = async (teacherID, data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/teachersapi/update/${teacherID}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data; //returns updated teacher data
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------------
  // function to delete teacher data
  // ------------------------------------------------
  const deleteTeacherData = async (teacherID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/teachersapi/delete/${teacherID}/`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        return response.status; //returns 204 if successful
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TeacherContext.Provider value={{ 
      teacherID,
      teacherData,
      setTeacherData,
      teachers,
      setTeachers,
      fetchAllTeachers,
      fetchTeachersByClass,
      fetchTeacherByID,
      updateTeacherData,
      deleteTeacherData,
     }}>
      {children}
    </TeacherContext.Provider>
  );
};
//

export { TeacherContext, TeacherContextProvider };
