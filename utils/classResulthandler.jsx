
  const calculateStudentResults = (data) => {
    const students = [];
  
    if (!data) return students;
  
    const TotalScore = (student) => {
      let totalSubjects = 0;
      let totalScore = 0;
      student.subjects_total.forEach(subject => {
        if (!isNaN(parseInt(subject.subject_total)) && subject.subject_total !== '-') {
          totalScore += parseInt(subject.subject_total);
          totalSubjects++;
        }
      });
      return { totalScore, totalSubjects }
    }

    const average = (totalScore, totalSubjects) => {
      return totalSubjects > 0 ? totalScore / totalSubjects : '-';
    }

    function position(students) {
      students.sort((a, b) => {
        if (a.Average === '-' && b.Average === '-') {
          return 0;
        } else if (b.Average === '-') {
          return -1;
        } else {
          return b.Average - a.Average;
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
    
      let previousAverage = null;
      let previousPosition = null;
    
      students.forEach((student, index) => {
        const currentAverage = student.Average;
        const suffix = getOrdinalSuffix(index + 1);
    
        if (currentAverage === '-') {
          student.Position = '-';
        } else if (currentAverage === previousAverage) {
          student.Position = previousPosition;
        } else {
          student.Position = `${index + 1}${suffix}`;
        }
        previousAverage = currentAverage;
        previousPosition = student.Position;
      });

    }

    const remark = (average) => {
      if (average === '-') return '-';
      if (average >= 70) return 'Excellent';
      else if (average >= 55) return 'Good';
      else if (average >= 40) return 'Pass';
      else return 'Fail';
    }

    data.forEach(student => {
      const { totalScore, totalSubjects } = TotalScore(student);
      const Average = average(totalScore, totalSubjects);
      const SubjectPosition = position(students);
      const Remark = remark(Average);
  
      students.push({
        ...student,
        TotalScore: totalScore,
        Average,
        Position: SubjectPosition,
        Remark
      });
    });
  
    return students;
  };
  
  export default calculateStudentResults;
  
