import React from "react";
import { RiPencilLine } from "react-icons/ri";
import { PiGraduationCapFill } from "react-icons/pi";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaPen, FaUser } from "react-icons/fa6";
import "./profile.css";

const ProfileCard = ({ teacherData, setEditMode }) => {
  return (
    <>
      {/* The Title */}
      <h5 className="my-3 mt-4">Profile Settings</h5>
      <div className="profile row">
        {/* the Section highlight */}
        <div className="col-md-3 d-none d-md-block ">
          <div className="card p-3 py-4">
            <div className="mb-2 profile-item active-profile-item px-3 py-2 rounded-pill">
              Account info
            </div>
            <div className="mb-2 profile-item">Personal info</div>
            <div className="mb-2 profile-item">School info</div>
          </div>
        </div>

        {/* the Section for the Profile */}
        <div className="col-md-9">
          <div className="card p-4 p-md-5">
            <div className="d-flex d-md-block justify-content-between">
              <h6 className="mb-3 ps-2">Account Information</h6>
              <div className="d-block d-md-none">
                <FaPen className="h6" style={{cursor:"pointer",color:"#012970"}}
                  onClick={() => setEditMode(true)}
                />
              </div>
            </div>

            <div className="d-block d-md-flex p-4 border rounded  justify-content-between mb-4">
              <div className="d-block d-md-flex">
                <div className="mb-3 me-0 mb-md-0 me-md-4">
                  {teacherData && teacherData.headshot ? (
                    <img
                      src={teacherData.headshot}
                      className="rounded-circle object-fit-cover"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectPosition: "top center",
                      }}
                      alt="profile"
                    />
                  ) : (
                    <div className="default-profile-icon rounded-circle">
                      <FaUser className="h2" />
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">
                    {teacherData && teacherData.firstName}{" "}
                    {teacherData && teacherData.surname}
                  </h5>
                  <div className="mt-1">
                    {teacherData &&
                      teacherData.user &&
                      teacherData.user.username}
                  </div>
                  <div className="small">
                    {teacherData && teacherData.teachers_id}
                  </div>
                </div>
              </div>

              <div className="d-none d-md-block">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setEditMode(true)}
                >
                  <RiPencilLine className="me-2 h6" />
                  Edit Profile
                </button>
              </div>
            </div>
            <h6 className="mb-3 ps-2">Personal Information</h6>
            <div className="d-block d-md-flex  p-4 border rounded p-3 justify-content-between mb-4">
              <div className="d-block d-md-flex  align-items-center">
                <div className="profile-icon-bio mb-3 me-0 mb-md-0 me-md-4 rounded-circle">
                  <BiSolidUserAccount className="h2" />
                </div>
                <div>
                  <div className="mb-1">
                    <span className="fw-bold" style={{ color: "#012970" }}>
                      Gender :
                    </span>{" "}
                    {teacherData && teacherData.sex
                      ? teacherData.sex
                      : "not provided"}
                  </div>
                  <div className="mb-1">
                    <span className="fw-bold" style={{ color: "#012970" }}>
                      Phone number :
                    </span>{" "}
                    {teacherData && teacherData.phone_number
                      ? teacherData.phone_number
                      : "not provided"}
                  </div>
                  <div className="mb-1">
                    <span className="fw-bold" style={{ color: "#012970" }}>
                      email :
                    </span>{" "}
                    {teacherData && teacherData.email
                      ? teacherData.email
                      : "not provided"}
                  </div>
                  <div className="mb-1">
                    <span className="fw-bold" style={{ color: "#012970" }}>
                      Address :
                    </span>{" "}
                    {teacherData && teacherData.address
                      ? teacherData.address
                      : "not provided"}
                  </div>
                </div>
              </div>
            </div>

            <h6 className="mb-3 ps-2">School Information</h6>

            <div className="d-block d-md-flex  p-4 border rounded p-3 justify-content-between">
              <div className="d-block d-md-flex  align-items-center">
                <div className="profile-icon mb-3 me-0 mb-md-0 me-md-4 rounded-circle">
                  <PiGraduationCapFill className="h2" />
                </div>
                <div>
                  <div className="mb-1">
                    <span className="fw-bold" style={{ color: "#012970" }}>
                      Classes taught :
                    </span>{" "}
                    {teacherData &&
                    teacherData.classes_taught &&
                    teacherData.classes_taught.length > 0
                      ? teacherData.classes_taught.map((item, index) => (
                          <span key={item.id}>
                            {item.name}{" "}
                            {index < teacherData.classes_taught.length - 1
                              ? ","
                              : ""}{" "}
                          </span>
                        ))
                      : "not provided"}
                  </div>
                  <div className="mb-1">
                    <span className="fw-bold" style={{ color: "#012970" }}>
                      Subjects taught :
                    </span>{" "}
                    {teacherData &&
                    teacherData.subjects_taught &&
                    teacherData.subjects_taught.length > 0
                      ? teacherData.subjects_taught.map((item, index) => (
                          <span key={item.id}>
                            {item.name}{" "}
                            {index < teacherData.classes_taught.length - 1
                              ? ","
                              : ""}{" "}
                          </span>
                        ))
                      : "not provided"}
                  </div>
                  <div className="mb-1">
                    <span className="fw-bold" style={{ color: "#012970" }}>
                      Role :
                    </span>{" "}
                    {teacherData && teacherData.role
                      ? teacherData.role
                      : "not provided"}
                  </div>

                  {teacherData && teacherData.is_formteacher ? (
                    <>
                      <div className="mb-1">
                        <span className="fw-bold" style={{ color: "#012970" }}>
                          Class Formed :
                        </span>{" "}
                        {teacherData && teacherData.classFormed
                          ? teacherData.classFormed.name
                          : "not provided"}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
