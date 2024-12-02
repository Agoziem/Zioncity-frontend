import React from "react";
import Card from "./Card";
import useLocalStorage from "@/hooks/useLocalStorage";

const StudentCards = ({ studentData, schoolData }) => {
  const [selectedClassid, setSelectedClassid] = useLocalStorage(
    "currentclassid",
    null
  );
  const studentClass = schoolData?.classes?.find(
    (classItem) => classItem.id === parseInt(selectedClassid)
  );

  return (
    <div className="row">
      {studentData &&
        schoolData &&
        Object.keys(studentData).length > 0 &&
        Object.keys(schoolData).length > 0 && (
          <>
            <Card
              cardtitle="School classes"
              cardbody={schoolData.classes.length}
              icon={"bi bi-mortarboard"}
            />
            <Card
              cardtitle="School Subjects"
              cardbody={schoolData.subjects.length}
              icon={"bi bi-journal-bookmark-fill"}
            />
            <Card
              cardtitle="Student Class"
              cardbody={studentClass.class}
              icon={"bi bi-people"}
            />
          </>
        )}
    </div>
  );
};

export default StudentCards;
