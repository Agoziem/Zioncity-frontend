"use client";
import React from "react";
import Datatablesortingicon from "./DatatableSortingIcon";
import "./Datatable.css";
import { HiRefresh } from "react-icons/hi";

const ClassResultDatatableitems = ({
  refresh,
  currentItems,
  loading,
  setItems,
}) => {
  const SubjectResults =
    currentItems && currentItems.length > 0
      ? currentItems[0].subjects_total
      : [];
  const getColorClass = (remark) => {
    if (remark === "Excellent") {
      return "text-success";
    } else if (remark === "Good") {
      return "text-warning";
    } else if (remark === "Pass") {
      return "text-secondary";
    } else {
      return "text-danger";
    }
  };

  return (
    <div className="card p-4">
      <div>
        <div style={{ cursor: "pointer" }} onClick={refresh} className="float-end d-flex align-items-center">
          <span className="me-2">Refresh</span>
          <HiRefresh className={`h4 ${loading ? "icon-rotate" : ""}`} />
        </div>
      </div>
      <div className="datatableCard table-responsive p-2">
        <table className="table table-bordered px-3">
          <thead>
            <tr>
              <th className="mx-5 p-2">
                firstname
                <Datatablesortingicon
                  itemstosort={currentItems}
                  setItems={setItems}
                  headername={"firstname"}
                />
              </th>

              <th className="mx-5 p-2">
                Surname
                <Datatablesortingicon
                  itemstosort={currentItems}
                  setItems={setItems}
                  headername={"surname"}
                />
              </th>

              <>
                {SubjectResults.map((subject, index) => (
                  <th key={index} className="mx-5 p-2">
                    {subject.subject_code}
                  </th>
                ))}
              </>

              <th className="mx-5 p-2">Total</th>

              <th className="mx-5 p-2">Ave</th>

              <th className="mx-5 p-2">POS</th>

              <th className="mx-5 p-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="17" className="text-center p-2">
                  Loading...
                </td>
              </tr>
            ) : (
              <>
                {currentItems && currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} item={item}>
                      <td className="mx-7 p-2 text-primary fw-bold">
                        {item.firstname}
                      </td>
                      <td className="mx-7 p-2 text-primary fw-bold">
                        {item.surname}
                      </td>
                      <>
                        {item.subjects_total.map((subject, index) => (
                          <td key={index} className="mx-7 p-2">
                            {subject.subject_total}
                          </td>
                        ))}
                      </>
                      <td className="mx-7 p-2">{item.TotalScore}</td>
                      <td className="mx-7 p-2">{item.Average}</td>
                      <td className="mx-7 p-2">{item.Position}</td>
                      <td
                        className={`mx-7 p-2 ${getColorClass(
                          item.Remark
                        )} fw-bold`}
                      >
                        {item.Remark}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="text-center p-2">
                      No Result Found for your Students{" "}
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassResultDatatableitems;
