"use client";
import React from "react";
import Datatablesortingicon from "./DatatableSortingIcon";
import { TiTimes } from "react-icons/ti";
import { HiRefresh } from "react-icons/hi";
import "./Datatable.css";
// make
const AnnualResultDatatableitems = ({
  refresh,
  currentItems,
  loading,
  setItems,
  toggleOfferingStatus,
}) => {
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
      <div className=" datatableCard table-responsive p-2">
        <table className="table table-striped px-3">
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

              <th className="mx-5 p-2">1st Term</th>

              <th className="mx-5 p-2">2nd Term</th>

              <th className="mx-5 p-2">3rd Term</th>

              <th className="mx-5 p-2">Total</th>

              <th className="mx-5 p-2">Ave</th>

              <th className="mx-5 p-2">Grade</th>

              <th className="mx-5 p-2">Pos</th>

              <th className="mx-5 p-2">Remark</th>

              <th className="mx-5 p-2">Remove</th>
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
                      <td className="mx-7 p-2 fw-bold text-primary">{item.firstname}</td>
                      <td className="mx-7 p-2 fw-bold text-primary">{item.surname}</td>
                      <td className="mx-7 p-2">{item.FirstTermTotal}</td>
                      <td className="mx-7 p-2">{item.SecondTermTotal}</td>
                      <td className="mx-7 p-2">{item.ThirdTermTotal}</td>
                      <td className="mx-7 p-2">{item.Total}</td>
                      <td className="mx-7 p-2">{item.Average}</td>
                      <td className="mx-7 p-2">{item.Grade}</td>
                      <td className="mx-7 p-2">{item.SubjectPosition}</td>
                      <td
                        className={`mx-7 p-2 ${getColorClass(
                          item.Remark
                        )} fw-bold`}
                      >
                        {item.Remark}
                      </td>
                      <td className="mx-7 p-2">
                        <TiTimes
                          className="text-danger h4"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleOfferingStatus(item.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="17" className="text-center p-2">
                      No Subject Annual Result Found
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

export default AnnualResultDatatableitems;
