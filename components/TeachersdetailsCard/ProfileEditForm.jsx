"use client";
import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { LuUpload } from "react-icons/lu";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { MultiSelectDropdown } from "./MultiSelect";
import { FaRegFileImage } from "react-icons/fa6";
import Alert from "../Alert/Alert";

const ProfileEditForm = ({
  showAlert,
  teacherData,
  setTeacherData,
  handleSubmit,
  setEditMode,
  schoolData,
  submitting,
}) => {
  const [isformteacher, setIsformteacher] = useState(false);
  const [fileName, setFileName] = useState("No Selected file");
  const fileInput = useRef(null);
  const [isclasslistOpen, setIsclasslistOpen] = useState(false);
  const [isSubjectlistOpen, setIsSubjectlistOpen] = useState(false);
  const image_URL = process.env.NEXT_PUBLIC_DJANGO_IMAGE_BASE_URL;

  useEffect(() => {
    if (teacherData && Object.keys(teacherData).length) {
      let isformteacher = teacherData.role === "Formteacher" ? true : false;
      setIsformteacher(isformteacher);
    }
  }, [teacherData]);

  return (
    <div className="profile-edit-card">
      <h5 className="my-4">Edit Profile</h5>
      <div className="card p-2 py-4 p-md-5">
        <div className="d-flex justify-content-end">
          <FaTimes
            className=" text-muted h4 me-3 me-md-0"
            onClick={() => {
              setEditMode(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form className="row" onSubmit={(e) => handleSubmit(e)}>
          {/* Personal information */}
          <div className="col-md-6 px-5">
            <div className="mb-3">
              <h6>Personal information</h6>
              <hr />
              <div className="mb-3">
                <p>
                  Personal information and Bio of the Teacher, such as the name,
                  Gender , Phone number and email
                </p>
              </div>

              {/* custom picture uploader */}
              <div className="form-profile">
                <input
                  ref={fileInput}
                  type="file"
                  id="file"
                  onChange={({ target: { files } }) => {
                    files[0] && setFileName(files[0].name);
                    if (files[0])
                      setTeacherData({
                        ...teacherData,
                        // headshot: URL.createObjectURL(files[0]),
                        headshot: `${files[0].name}`,
                      });
                  }}
                  hidden
                />

                {/* display the image or the icon */}
                <div>
                  <div className="d-flex align-items-center mt-2">
                    <div>
                      {teacherData.headshot ? (
                        <img
                          src={teacherData.headshot}
                          className="rounded-circle object-fit-cover me-3"
                          alt="profile"
                          height={75}
                          width={75}
                          style={{ objectPosition: "top center" }}
                        />
                      ) : (
                        <>
                          <FaUserCircle
                            className="me-3 text-muted"
                            alt="profile"
                            style={{ fontSize: "75px" }}
                          />
                        </>
                      )}
                    </div>

                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary mt-3"
                        disabled
                        onClick={(e) => {
                          e.preventDefault();
                          fileInput.current.click();
                        }}
                      >
                        <LuUpload className="h5 me-2" />
                        {teacherData.headshot ? "Change Image" : "Upload Image"}
                      </button>
                    </div>
                  </div>

                  {/* display the file name & the delete icon */}
                  <div className="d-flex align-items-center rounded py-3">
                    <FaRegFileImage className="h4 text-primary" />
                    <p className="font-medium text-sm mt-2 mx-3 mb-2">
                      {fileName}
                    </p>
                    {teacherData.headshot && (
                      <FaTimes
                        className="h-5 w-6 text-danger ms-2"
                        onClick={() => {
                          setFileName("No Selected file");
                          setTeacherData({ ...teacherData, headshot: null });
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 px-5">
            <div className=" mb-3 row align-content-center">
              <div className="col-md">
                <label htmlFor="name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="profile-form-control form-control"
                  id="name"
                  placeholder="firstname.."
                  value={teacherData.firstName}
                  onChange={(e) => {
                    setTeacherData({
                      ...teacherData,
                      firstName: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-md">
                <label htmlFor="Surname" className="form-label">
                  Surname
                </label>
                <input
                  type="text"
                  className="profile-form-control form-control"
                  id="Surname"
                  placeholder="surname..."
                  value={teacherData.surname}
                  onChange={(e) => {
                    setTeacherData({ ...teacherData, surname: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <div className="col-md">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="profile-form-select form-select"
                  id="gender"
                  value={teacherData.sex}
                  onChange={(e) => {
                    setTeacherData({ ...teacherData, sex: e.target.value });
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="col-md">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="profile-form-control form-control"
                  id="phone"
                  placeholder="phone number..."
                  value={teacherData.phone_number}
                  onChange={(e) => {
                    setTeacherData({
                      ...teacherData,
                      phone_number: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="profile-form-control form-control"
                id="email"
                placeholder="email..."
                value={teacherData.email}
                onChange={(e) => {
                  setTeacherData({ ...teacherData, email: e.target.value });
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="profile-form-control form-control"
                id="address"
                placeholder="your address..."
                value={teacherData.address}
                onChange={(e) => {
                  setTeacherData({ ...teacherData, address: e.target.value });
                }}
              />
            </div>
          </div>
          <hr className="my-5" />

          {/* Professional information */}
          <div className="col-md-6 px-5">
            <div className="mb-3">
              <h6>School information</h6>
              <hr />
              <div className="mb-3">
                <p>
                  Professional information of the Teacher, such as the subjects
                  taught in your School and classes
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 px-5">
            <div className="mb-3">
              <label htmlFor="Role" className="form-label">
                Role
              </label>
              <select
                id="Role"
                className="profile-form-select form-select"
                aria-label="Default select example"
                value={teacherData.role}
                onChange={(e) => {
                  setTeacherData((prevTeacherData) => {
                    const newTeacherData = {
                      ...prevTeacherData,
                      role: e.target.value,
                    };
                    const isFormTeacher = e.target.value === "Formteacher";
                    return { ...newTeacherData, is_formteacher: isFormTeacher };
                  });
                }}
              >
                <option value="">Select your Role</option>
                <option value="Teacher">Teacher</option>
                <option value="Formteacher">Formteacher</option>
              </select>
            </div>

            {isformteacher && (
              <div className="mb-3">
                <label htmlFor="ClassFormed" className="form-label">
                  ClassFormed
                </label>
                <select
                  id="ClassFormed"
                  className="profile-form-select form-select"
                  aria-label="Default select example"
                  value={
                    teacherData.classFormed ? teacherData.classFormed.id : ""
                  }
                  onChange={(e) => {
                    setTeacherData({
                      ...teacherData,
                      classFormed: {
                        id: e.target.value,
                        name: e.target.options[e.target.selectedIndex].text,
                      },
                    });
                  }}
                >
                  <option value="">Select your Class</option>
                  {schoolData &&
                    schoolData.classes.length > 0 &&
                    schoolData.classes.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.class}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* custom Multiple Select Form */}
            <div className="mb-3">
              <label htmlFor="classes_taught" className="form-label">
                classes taught
              </label>
              <MultiSelectDropdown
                setIsOpen={setIsclasslistOpen}
                isOpen={isclasslistOpen}
                itemName={"Classes"}
                schoolData={schoolData && schoolData}
                setTeacherData={setTeacherData}
                teacherData={teacherData && teacherData}
                teacherDataKey={"classes_taught"}
                schoolDataKey={"classes"}
                schoolDataListKey={"class"}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="subjects_taught" className="form-label">
                Subjects taught
              </label>
              <MultiSelectDropdown
                setIsOpen={setIsSubjectlistOpen}
                isOpen={isSubjectlistOpen}
                itemName={"Subjects"}
                schoolData={schoolData && schoolData}
                setTeacherData={setTeacherData}
                teacherData={teacherData && teacherData}
                teacherDataKey={"subjects_taught"}
                schoolDataKey={"subjects"}
                schoolDataListKey={"subject"}
              />
            </div>
          </div>

          <hr className="my-5" />
          <div className="col-md-6 justify-content-end px-5">
            {showAlert.show && showAlert.type === "danger" && (
              <Alert type={showAlert.type}>{showAlert.message}</Alert>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  <span>updating profile ...</span>
                </>
              ) : (
                "update profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
