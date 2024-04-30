"use client";
import React from "react";
import Datatablesortingicon from "./DatatableSortingIcon";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import Link from "next/link";
import "./Datatable.css";
import { HiRefresh } from "react-icons/hi";

const Datatableitems = ({
  refresh,
  currentItems,
  loading,
  setItems,
  toggleModal,
  classID,
  setStudenttodelete,
}) => {
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

              <th className="mx-5 p-2">
                Sex
                <Datatablesortingicon
                  itemstosort={currentItems}
                  setItems={setItems}
                  headername={"sex"}
                />
              </th>

              <th className="mx-5 p-2">Student ID</th>

              <th className="mx-5 p-2">edit</th>
              <th className="mx-5 p-2">delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-2">
                  Loading...
                </td>
              </tr>
            ) : (
              <>
                {currentItems &&
                  currentItems.length > 0 &&
                  currentItems.map((item) => (
                    <tr key={item.id} item={item}>
                      <td className="mx-7 p-2">{item.firstname}</td>
                      <td className="mx-7 p-2">{item.surname}</td>
                      <td className="mx-7 p-2">{item.sex}</td>
                      <td className="mx-7 p-2">{item.student_id}</td>
                      <td className="mx-7 p-2">
                        <Link
                          href={`/teachers-portal/students/${classID}/update-student/?id=${item.id}`}
                        >
                          <FaRegPenToSquare
                            className="text-primary me-4 h5"
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                      </td>

                      <td className="mx-7 p-2">
                        <IoTrashOutline
                          className="text-danger h5"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setStudenttodelete({
                              studentID: item.id,
                              studentName: item.firstname,
                            });
                            toggleModal();
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Datatableitems;
