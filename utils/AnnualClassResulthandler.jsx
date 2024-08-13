function AnnualClassResultHandler(students) {
  // Helper function to calculate the overall total score (sum of subject averages)
  function calculateTotal(student) {
    let overalltotal = student.subjects.reduce((sum, subjectObj) => {
      const subjectKey = Object.keys(subjectObj)[0];
      const average = subjectObj[subjectKey].Ave;
      return (
        sum + (isNaN(average) || average === "-" ? 0 : parseFloat(average))
      );
    }, 0);
    return parseFloat(overalltotal.toFixed(2));
  }

  // Helper function to calculate the average of the subject averages
  function calculateAverage(student) {
    let validSubjectsCount = student.subjects.reduce((count, subjectObj) => {
      const subjectKey = Object.keys(subjectObj)[0];
      const average = subjectObj[subjectKey].Ave;
      return count + (isNaN(average) || average === "-" ? 0 : 1);
    }, 0);

    if (validSubjectsCount === 0) return "-";
    let total = calculateTotal(student);
    let average = validSubjectsCount > 0 ? total / validSubjectsCount : 0;

    return parseFloat(average.toFixed(2));
  }

  // Helper function to calculate the grade based on average score
  function calculateGrade(student) {
    if (student.Average === "-") return "-";
    else if (student.Average >= 70) return "A";
    else if (student.Average >= 55) return "C";
    else if (student.Average >= 40) return "P";
    else return "F";
  }

  // Helper function to calculate the position of each student based on their average
  function calculatePosition(students) {
    students.sort((a, b) => {
      if (a.Average === "-" && b.Average === "-") {
        return 0;
      } else if (b.Average === "-") {
        return -1;
      } else {
        return b.Average - a.Average;
      }
    });

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

    let previousAverage = null;
    let previousPosition = null;

    students.forEach((student, index) => {
      const currentAverage = student.Average;
      const suffix = getOrdinalSuffix(index + 1);

      if (currentAverage === "-") {
        student.Position = "-";
      } else if (currentAverage === previousAverage) {
        student.Position = previousPosition;
      } else {
        student.Position = `${index + 1}${suffix}`;
      }

      previousAverage = currentAverage;
      previousPosition = student.Position;
    });
  }

  // Helper function to calculate remarks based on the grade
  function calculateRemarks(students) {
    students.forEach((student) => {
      if (student.Grade === "-") student.Remarks = "-";
      else if (student.Grade === "A") student.Remarks = "Excellent";
      else if (student.Grade === "C") student.Remarks = "Good";
      else if (student.Grade === "P") student.Remarks = "Pass";
      else student.Remarks = "Fail";
    });
  }

  // Helper function to declare the principal's verdict based on the grade
  function declareVerdict(students) {
    students.forEach((student) => {
      if (student.Grade === "-") student.PrincipalVerdict = "-";
      else if (student.Grade === "A") student.PrincipalVerdict = "Promoted";
      else if (student.Grade === "C") student.PrincipalVerdict = "Promoted";
      else if (student.Grade === "P") student.PrincipalVerdict = "Promoted";
      else student.PrincipalVerdict = "Not Promoted";
    });
  }

  // Process each student
  students.forEach((student) => {
    student.TotalScore = calculateTotal(student); // Calculate the overall total
    student.Average = calculateAverage(student); // Calculate the average of averages
    student.Grade = calculateGrade(student);
    student.Position = "-";
    student.Remarks = "-";
    student.PrincipalVerdict = "-";
  });

  // Calculate position, remarks, and verdict for all students
  calculatePosition(students);
  calculateRemarks(students);
  declareVerdict(students);

  return students;
}

export default AnnualClassResultHandler;
