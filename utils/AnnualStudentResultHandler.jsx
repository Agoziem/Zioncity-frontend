// get Position Ordinal of each student
const getOrdinalSuffix = (number) => {
  if (number === 11 || number === 12 || number === 13) {
    return "th";
  } else {
    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
};

//   Calculate the Total Score
const calculateTotal = (student) => {
  const relevantKeys = ["FirstTermTotal", "SecondTermTotal", "ThirdTermTotal"];
  return relevantKeys.reduce((sum, key) => {
    const value = student[key];
    return sum + (isNaN(value) || value === "-" ? 0 : parseFloat(value));
  }, 0);
};

//   Calculate the Average
const calculateAverage = (student) => {
  const values = [
    student.FirstTermTotal,
    student.SecondTermTotal,
    student.ThirdTermTotal,
  ];
  const allEmptyOrDash = values.every((value) => value === "-" || value === "");
  if (allEmptyOrDash) {
    return "-";
  }
  const greaterThanOrEqualToOneCount = values.filter(
    (key) => parseInt(key) >= 0 && key !== "-" && key !== ""
  ).length;
  return greaterThanOrEqualToOneCount !== 0
    ? parseFloat((student.Total / greaterThanOrEqualToOneCount).toFixed(2))
    : 0;
};

//  Calculate the Grade
const calculateGrade = (average) => {
  if (average >= 70) return "A";
  else if (average >= 55) return "C";
  else if (average >= 40) return "P";
  else return "F";
};


// Calculate the Position
const calculatePosition = (students) => {
  students.sort((a, b) => b.Average - a.Average);

  let previousAverage = null;
  let previousPosition = null;

  students.forEach((student, index) => {
    const currentTotal = student.Average;
    const suffix = getOrdinalSuffix(index + 1);

    if (currentTotal === previousAverage) {
      student.SubjectPosition = previousPosition;
    } else {
      student.SubjectPosition = `${index + 1}${suffix}`;
    }

    previousAverage = currentTotal;
    previousPosition = student.SubjectPosition;
  });
};


// Calculate the Remarks
const calculateRemarks = (students) => {
  students.forEach((student) => {
    if (student.Grade === "-") student.Remark = "-";
    else if (student.Grade === "A") student.Remark = "Excellent";
    else if (student.Grade === "C") student.Remark = "Good";
    else if (student.Grade === "P") student.Remark = "Pass";
    else student.Remark = "Fail";
  });
};

// Function to handle the annual result of each student
function AnnualResultHandler(data) {
    const students = data.map((student) => {
        const total = calculateTotal(student);
        const average = calculateAverage({ ...student, Total: total });
        const grade = calculateGrade(average);
        return {
            ...student,
            Total: total,
            Average: average,
            Grade: grade,
            SubjectPosition: "-",
            Remark: "-",
        };
    });

    calculatePosition(students);
    calculateRemarks(students);

    return students;
}

export default AnnualResultHandler;
