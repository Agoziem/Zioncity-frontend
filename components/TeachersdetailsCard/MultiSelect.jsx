"use client";
import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "@/components/header/Nav/nav.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import useClickOutside from "@/hooks/useClickOutside";

export const MultiSelectinput = ({
  multiselectbuttonref, // the ref of the button to toggle the dropdown
  schoolData, // the school data to be displayed in the dropdown
  teacherData, // the teacher data to be updated
  setTeacherData, // the function to update the data
  keyname, // the keyname of the data to be updated e.g classes or Subjects
  schoollist, // the keyname of the data to be displayed on the dropdown input
  schoolkey, // the keyname of the data to be displayed on the dropdown list
  setIsOpen, // the function to toggle the dropdown
  isOpen, // the state to toggle the dropdown
  itemName, // the name of the data Caption to be displayed eg classes or subjects
}) => {
  const handleChange = (event, item) => {
    if (event.target.checked) {
      setTeacherData({
        ...teacherData,
        [keyname]: [
          ...teacherData[keyname],
          { id: item.id, name: item[schoollist] },
        ],
      });
    } else {
      setTeacherData({
        ...teacherData,
        [keyname]: teacherData[keyname].filter((i) => i.id !== item.id),
      });
    }
  };

  return (
    <>
      {/* the custom select item */}
      <div className="py-3 px-4 border border-gray-300 rounded">
        <div className="d-flex justify-content-between flex-wrap">
          <div
            className="d-flex flex-wrap align-items-center"
            style={{ maxWidth: "85%" }}
          >
            {keyname &&
              teacherData &&
              teacherData[keyname].length !== 0 &&
              teacherData[keyname].map((option) => (
                <div
                  key={option.id}
                  className="bg-secondary text-white px-3 py-1 rounded-pill mx-1 my-1"
                >
                  {option.name}
                  <span
                    className="mx-1"
                    onClick={() =>
                      setTeacherData({
                        ...teacherData,
                        [keyname]: teacherData[keyname].filter(
                          (i) => i.id !== option.id
                        ),
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <FaTimes />
                  </span>
                </div>
              ))}

            <div
              className="mx-1 my-1"
              onClick={() => setIsOpen(!isOpen)}
              style={{ cursor: "pointer" }}
            >
              Select {itemName}
            </div>
          </div>

          <div className="ms-2" ref={multiselectbuttonref}>
            <RiArrowDropDownLine
              className="h4"
              onClick={() => setIsOpen(!isOpen)}
              style={{ fontSize: "30px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* the dropdown */}
      <div className="dropdown px-4 py-2">
        <ul
          className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow ${
            isOpen ? "show" : ""
          }`}
        >
          {schoolkey &&
            schoolData &&
            schoolData[schoolkey] !== 0 &&
            schoolData[schoolkey].map((item, index) => (
              <React.Fragment key={item.id}>
                <li
                  className="dropdown-item d-flex align-items-center"
                >
                  <input
                    type="checkbox"
                    onChange={(event) => handleChange(event, item)}
                    className="me-3"
                    checked={teacherData[keyname].some((i) => i.id === item.id)}
                    style={{ cursor: "pointer" }}
                    id={item[schoollist]}
                  />
                  <label htmlFor={item[schoollist]}>{item[schoollist]}</label>
                </li>
                {index !== schoolData[schoolkey].length - 1 && (
                  <li key={`Divider-${index}`}>
                    <hr className="dropdown-divider" />
                  </li>
                )}
              </React.Fragment>
            ))}
        </ul>
      </div>
    </>
  );
};


// The Main Dropdown component
export const MultiSelectDropdown = ({
  isOpen,
  setIsOpen,
  itemName,
  schoolData,
  setTeacherData,
  teacherData,
  teacherDataKey,
  schoolDataListKey,
  schoolDataKey,
}) => {
  const multipleselectdropdownRef = useRef(null);
  const multiselectbuttonref = useRef(null);
  useClickOutside(multipleselectdropdownRef, multiselectbuttonref, () =>
    setIsOpen(false)
  );

  return (
    <div ref={multipleselectdropdownRef}>
      <MultiSelectinput
        multiselectbuttonref={multiselectbuttonref}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemName={itemName}
        schoolData={schoolData}
        setTeacherData={setTeacherData}
        teacherData={teacherData}
        keyname={teacherDataKey}
        schoolkey={schoolDataKey}
        schoollist={schoolDataListKey}
      />
    </div>
  );
};
