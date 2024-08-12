import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const SubjectResultPublishedlist = ({
  listofSubjectResultPublished,
  isAnnual = false,
}) => {
  return (
    <div className="card">
      <div className="card-header pt-4 ps-4">
        <h6>List of Published Subject Results</h6>
      </div>
      <ul className="list-group list-group-flush px-4 py-3">
        {!isAnnual ? (
          listofSubjectResultPublished &&
          listofSubjectResultPublished.subjects_total.length > 0 ? (
            listofSubjectResultPublished.subjects_total.map((result) => (
              <li className="list-group-item " key={result.subject_code}>
                {result.published ? (
                  <>
                    <FaCheck className={"text-success fw-bold "} />
                    <span className="ms-3 text-success">
                      {result.subject_name}
                    </span>
                  </>
                ) : (
                  <>
                    <FaTimes className={"text-secondary fw-bold"} />
                    <span className="ms-3 text-secondary ">
                      {result.subject_name}
                    </span>
                  </>
                )}
              </li>
            ))
          ) : (
            <li className="list-group-item">
              <p>No Subject Result available at the moment for your Class</p>
            </li>
          )
        ) : listofSubjectResultPublished &&
          listofSubjectResultPublished.subjects.length > 0 ? (
          listofSubjectResultPublished.subjects.map((subject, index) => {
            const subjectKey = Object.keys(subject)[0];
            const subjectData = subject[subjectKey];

            return (
              <li className="list-group-item" key={index}>
                {subjectData.published ? (
                  <>
                    <FaCheck className={"text-success fw-bold"} />
                    <span className="ms-3 text-success">{subjectKey}</span>
                  </>
                ) : (
                  <>
                    <FaTimes className={"text-secondary fw-bold"} />
                    <span className="ms-3 text-secondary">{subjectKey}</span>
                  </>
                )}
              </li>
            );
          })
        ) : (
          <li className="list-group-item">
            <p>No Subject Result available at the moment for your Class</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SubjectResultPublishedlist;
