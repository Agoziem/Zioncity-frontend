"use client";
import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const StudentsContext = createContext();

const StudentsContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  const [studentID, setStudentID] = useState(null);
  const [StudentData, setStudentData] = useState({});
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(false);

  const [storedStudentID, setStoredStudentID] = useLocalStorage(
    "studentID",
    studentID
  );

  useEffect(() => {
    if (storedStudentID) {
      setStudentID(storedStudentID);
    }
  }, [storedStudentID]);

  // ------------------------------------------------
  // function to fetch all Students data paginated
  // ------------------------------------------------
  const fetchAllStudents = async (page = 1, pageSize = 20) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/studentsapi/${schoolID}?page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data.results);
        setTotalStudents(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------
  // function to fetch Students data by Class
  // -------------------------------------------
  const fetchStudentsByClass = async (classID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/studentsapi/${schoolID}/${classID}/`
      );
      if (response.ok) {
        const data = await response.json();
        return data; //returns list of Students in the class
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------
  // function to fetch Student data by ID
  // ---------------------------------------
  const fetchStudentByID = async (studentID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/studentsapi/student/${studentID}/`
      );
      if (response.ok) {
        const data = await response.json();
        return data; //returns Student data
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (studentID) {
      fetchStudentByID(studentID).then((data) => {
        setStudentData(data);
        console.log("data;", data);
      });
    }
  }, [studentID]);

  // ----------------------------------------
  // function to update Student data
  // ----------------------------------------
  const updateStudentData = async (studentID, data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/studentsapi/update/${studentID}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------------------------
  // function to delete Student data
  // ----------------------------------------
  const deleteStudentData = async (studentID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/studentsapi/delete/${studentID}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StudentsContext.Provider
      value={{
        studentID,
        StudentData,
        setStudentData,
        students,
        setStudents,
        totalPages,
        setTotalPages,
        totalStudents,
        setTotalStudents,
        loading,
        setLoading,
        fetchAllStudents,
        fetchStudentsByClass,
        fetchStudentByID,
        updateStudentData,
        deleteStudentData,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export { StudentsContext, StudentsContextProvider };
