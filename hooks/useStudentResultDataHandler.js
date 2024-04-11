import { useEffect, useState } from 'react';

// this hook is used to calculate the CA, Total, Grade, Position and Remarks of each student based on the Json data provided

const useStudentDataHandler = (data) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (data) {
      const updatedStudents = calculateFields(data);
      setStudents(updatedStudents);
    }
  }, [data]);

  const calculateFields = (data) => {
    const updatedStudents = data.map(student => {
      const CA = calculateCA(student);
      const Total = calculateTotal(student, CA);
      const Grade = calculateGrade(Total);
      const Position = calculatePosition(updatedStudents, Total);
      const Remarks = calculateRemarks(Grade);
      return { ...student, CA, Total, Grade, Position, Remarks };
    });
    return updatedStudents;
  };

//   function to calculate the CA of each student
  const calculateCA = (student) => {
    const keys = Object.keys(student);
    const startIndex = keys.indexOf("Name") + 1;
    const endIndex = keys.indexOf("Exam");
    const relevantKeys = keys.slice(startIndex, endIndex);
    return relevantKeys.reduce((sum, key) => sum + (isNaN(student[key]) || student[key] === '' ? 0 : parseInt(student[key])), 0);
  };

//   function to calculate the total score of each student based on the CA and Exam score
  const calculateTotal = (student, CA) => {
    if (student['Exam'] === '-' || student['Exam'] === '') {
      return '-';
    } else {
      return Object.keys(student)
        .filter(key => key.startsWith("CA") || key.startsWith("Exam"))
        .reduce((sum, key) => sum + (isNaN(student[key]) ? 0 : parseInt(student[key])), CA);
    }
  };

//   function to calculate the grade of each student based on the total score
  const calculateGrade = (total) => {
    if (total === '-') {
      return '-';
    } else {
      if (total >= 70) return "A";
      else if (total >= 55) return "C";
      else if (total >= 40) return "P";
      else return "F";
    }
  };

    // function to calculate the position of each student based on the total score
  const calculatePosition = (students, total) => {
    students.sort((a, b) => {
      if (a.Total === '-' && b.Total === '-') {
        return 0;
      } else if (b.Total === '-') {
        return -1;
      } else {
        return b.Total - a.Total;
      }
    });

    const index = students.findIndex(student => student.Total === total);
    if (index === -1) {
      return '-';
    } else {
      const position = index + 1;
      const suffix = getOrdinalSuffix(position);
      return `${position}${suffix}`;
    }
  };

  const getOrdinalSuffix = (number) => {
    if (number === 11 || number === 12 || number === 13) {
      return 'th';
    } else {
      const lastDigit = number % 10;
      switch (lastDigit) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }
  };

//   function to calculate the remarks of each student based on the grade
  const calculateRemarks = (grade) => {
    if (grade === "-") return "-";
    else if (grade === "A") return "Excellent";
    else if (grade === "C") return "Good";
    else if (grade === "P") return "Pass";
    else return "Fail";
  };

  return students;
};

export default useStudentDataHandler;

// Usage Example
// import React from 'react';
// import useStudentDataHandler from './hooks/useStudentDataHandler';
// 
// const StudentResultTable = ({ data }) => {
//     const students = useStudentDataHandler(data);
//   return (
//    import the Datatable component from Datatable.js
// );
//};