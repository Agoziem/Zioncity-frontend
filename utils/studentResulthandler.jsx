
const calculateCA = (student) => {
  const relevantKeys = ['FirstTest', 'FirstAss', 'MidTermTest', 'Project', 'SecondAss', 'SecondTest'];
  return relevantKeys.reduce((sum, key) => sum + (isNaN(student[key]) || student[key] === '' ? 0 : parseInt(student[key])), 0);
};


// Function to calculate the total score of each student based on the CA and Exam score
const calculateTotal = (student, CA) => {
  if (student['Exam'] === '-' || student['Exam'] === '') {
    return '-';
  } else {
    return Object.keys(student)
      .filter(key => key.startsWith("CA") || key.startsWith("Exam"))
      .reduce((sum, key) => sum + (isNaN(student[key]) ? 0 : parseInt(student[key])), CA);
  }
};


// Function to calculate the grade of each student based on the total score
const calculateGrade = (total) => {
  if (total === '-') return '-';
  else if (total >= 70) return 'A';
  else if (total >= 55) return 'C';
  else if (total >= 40) return 'P';
  else return 'F';
};

// Function to calculate the position of each student based on the total score
function calculatePosition(students) {
  students.sort((a, b) => {
    if (a.Total === '-' && b.Total === '-') {
      return 0;
    } else if (b.Total === '-') {
      return -1;
    } else {
      return b.Total - a.Total;
    }
  });

  // Function to calculate ordinal suffix
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

  let previousTotal = null;
  let previousPosition = null;

  students.forEach((student, index) => {
    const currentTotal = student.Total;
    const suffix = getOrdinalSuffix(index + 1);

    if (currentTotal === '-') {
      student.SubjectPosition = '-';
    } else if (currentTotal === previousTotal) {
      student.SubjectPosition = previousPosition;
    } else {
      student.SubjectPosition = `${index + 1}${suffix}`;
    }
    previousTotal = currentTotal;
    previousPosition = student.SubjectPosition;
  });
}


// Function to calculate the remarks of each student based on the grade
const calculateRemarks = (grade) => {
  if (grade === "-") return "-";
  else if (grade === "A") return "Excellent";
  else if (grade === "C") return "Good";
  else if (grade === "P") return "Pass";
  else return "Fail";
};



// Function to calculate student results
const calculateStudentResults = (data) => {
  const students = [];

  if (!data) return students;

  data.forEach(student => {
    const CA = calculateCA(student);
    const Total = calculateTotal(student, CA);
    const Grade = calculateGrade(Total);
    const SubjectPosition = calculatePosition(students);
    const Remark = calculateRemarks(Grade);

    students.push({ ...student, CA, Total, Grade, SubjectPosition, Remark });
  });

  return students;
};

export default calculateStudentResults;
