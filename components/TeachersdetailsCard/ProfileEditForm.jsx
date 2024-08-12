"use client";
import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { FaTimes } from "react-icons/fa";
import { MultiSelectDropdown } from "../form/MultiSelect";
import Alert from "../Alert/Alert";
import ImageUploader from "../Imageuploader/ImageUploader";

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
  //   {
  //     "id": 5,
  //     "user": {
  //         "id": 15,
  //         "username": "@NdukweWinner9723"
  //     },
  //     "classes_taught": [
  //         {
  //             "id": 1,
  //             "name": "Jss1A"
  //         },
  //         {
  //             "id": 2,
  //             "name": "Jss1B"
  //         },
  //         {
  //             "id": 3,
  //             "name": "Jss1C"
  //         }
  //     ],
  //     "subjects_taught": [
  //         {
  //             "id": 1,
  //             "name": "Mathematics"
  //         },
  //         {
  //             "id": 2,
  //             "name": "English"
  //         },
  //         {
  //             "id": 3,
  //             "name": "Igbo Language"
  //         }
  //     ],
  //     "school": {
  //         "id": 2,
  //         "name": "Kings College"
  //     },
  //     "classFormed": {
  //         "id": 2,
  //         "name": "Jss1B"
  //     },
  //     "headshot": "/media/assets/TeachersProfileimages/IMG_20230808_195658_1.jpg",
  //     "headshot_url": "http://127.0.0.1:8000/media/assets/TeachersProfileimages/IMG_20230808_195658_1.jpg",
  //     "headshot_name": "IMG_20230808_195658_1.jpg",
  //     "firstName": "Chiagoziem",
  //     "surname": "Ndukwe",
  //     "sex": "Female",
  //     "phone_number": "08080982606",
  //     "email": "chiagoziendukwe90@gmail.com",
  //     "address": "No 2, Ojike Street, Awka, Anambra State",
  //     "teachers_id": "teacher/9723",
  //     "role": "Formteacher",
  //     "is_formteacher": true
  // }

  useEffect(() => {
    if (teacherData && Object.keys(teacherData).length) {
      let isformteacher = teacherData.role === "Formteacher" ? true : false;
      setIsformteacher(isformteacher);
    }
  }, [teacherData]);

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

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
                <ImageUploader
                  imagekey={"headshot"}
                  imageurlkey={"headshot_url"}
                  imagename={"headshot_name"}
                  formData={teacherData}
                  setFormData={setTeacherData}
                />
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
                  name="firstName"
                  onChange={handleChange}
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
                  name="surname"
                  onChange={handleChange}
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
                  name="sex"
                  onChange={handleChange}
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
                  name="phone_number"
                  onChange={handleChange}
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
                name="email"
                onChange={handleChange}
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
                name="address"
                onChange={handleChange}
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
                  value={teacherData?.classFormed?.id || ""}
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

            <div className="my-3">
              <label className="form-label">classes taught</label>
              <MultiSelectDropdown
                initiallist={schoolData?.classes}
                currentlist={teacherData?.classes_taught}
                setCurrentlist={(list) =>
                  setTeacherData({ ...teacherData, classes_taught: list })
                }
                itemName="Classes"
              />
            </div>

            <div className="my-3">
              <label className="form-label">subjects taught</label>
              <MultiSelectDropdown
                initiallist={schoolData?.subjects}
                currentlist={teacherData?.subjects_taught}
                setCurrentlist={(list) =>
                  setTeacherData({ ...teacherData, subjects_taught: list })
                }
                itemName="Subjects"
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
