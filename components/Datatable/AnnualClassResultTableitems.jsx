"use client";
import React from "react";
import Datatablesortingicon from "./DatatableSortingIcon";
import "./Datatable.css";
import { HiRefresh } from "react-icons/hi";

const AnnualClassResultDatatableitems = ({
  refresh,
  currentItems,
  loading,
  setItems,
}) => {
  // If subjects exist, extract subject codes
  const subjectCodes =
    currentItems && currentItems.length > 0
      ? currentItems[0].subjects?.map((subject) => Object.keys(subject)[0])
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
        <div
          style={{ cursor: "pointer" }}
          onClick={refresh}
          className="float-end d-flex align-items-center"
        >
          <span className="me-2">Refresh</span>
          <HiRefresh className={`h4 ${loading ? "icon-rotate" : ""}`} />
        </div>
      </div>
      <div className="datatableCard table-responsive p-2">
        <table className="table table-bordered px-3">
          <thead>
            <tr>
              <th className="mx-5 p-2">
                Firstname
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

              {/* Dynamic Subject Headers */}
              {subjectCodes.map((subjectCode, index) => (
                <th key={index} className="mx-5 p-2">
                  {subjectCode}
                </th>
              ))}

              <th className="mx-5 p-2">Total</th>

              <th className="mx-5 p-2">Ave</th>

              <th className="mx-5 p-2">POS</th>

              <th className="mx-5 p-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={subjectCodes.length + 5} className="text-center p-2">
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

                      {/* Display Averages for each Subject */}
                      {item.subjects.map((subject, index) => (
                        <td key={index} className="mx-7 p-2">
                          {Object.values(subject)[0].Ave}
                        </td>
                      ))}

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
                    <td colSpan={subjectCodes.length + 6} className="text-center p-2">
                      No Result Found for your Students
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

export default AnnualClassResultDatatableitems;
