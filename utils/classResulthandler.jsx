const calculateStudentResults = (data) => {
  if (!data) return students;

  const TotalScore = (student) => {
    let totalSubjects = 0;
    let totalScore = 0;
    student.subjects_total.forEach((subject) => {
      if (
        !isNaN(parseInt(subject.subject_total)) &&
        subject.subject_total !== "-"
      ) {
        totalScore += parseInt(subject.subject_total);
        totalSubjects++;
      }
    });
    return { totalScore, totalSubjects };
  };

  const average = (totalScore, totalSubjects) => {
    const averageScore = totalSubjects > 0 ? totalScore / totalSubjects : "-";
    return typeof averageScore === "number"
      ? Number(averageScore.toFixed(2))
      : averageScore;
  };

  const remark = (average) => {
    if (average === "-") return "-";
    if (average >= 70) return "Excellent";
    else if (average >= 55) return "Good";
    else if (average >= 40) return "Pass";
    else return "Fail";
  };

  function position(studentsdata) {
    studentsdata.sort((a, b) => {
      if (a.Average === "-" && b.Average === "-") {
        return 0;
      } else if (b.Average === "-") {
        return -1;
      } else {
        return b.Average - a.Average;
      }
    });

    // Function to calculate ordinal suffix
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

    studentsdata.forEach((student, index) => {
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

    return studentsdata;
  }

  // Calculate the Total Score, Average and Remark for each student
  data.forEach((student) => {
    const { totalScore, totalSubjects } = TotalScore(student);
    const Average = average(totalScore, totalSubjects);
    const Remark = remark(Average);
    student.TotalScore = totalScore;
    student.Average = Average;
    student.Remark = Remark;
  });

  // Sort the data array according to the Average Score and get there Position
  const sorteddata = position(data);

  // Return the sorted data array according to Position
  return sorteddata;
};

export default calculateStudentResults;

//
