"use client";
import Loginform from "@/components/loginforms/Loginform";
// import MainHeader from "@/components/header/Mainheader/MainHeader";
// import Link from "next/link";
import { SchoolContext } from "@/data/Schoolcontextdata";
import { useContext, useEffect, useState } from "react";
import {
  FaMoneyBillTrendUp,
  FaUserGraduate,
  FaUserLock,
  FaUserTie,
} from "react-icons/fa6";

const Home = () => {
  const { schoolData } = useContext(SchoolContext);
  const [schoolTeachers, setSchoolTeachers] = useState([]);
  const [schoolAdmin, setSchoolAdmin] = useState([]);
  const [schoolStudents, setSchoolStudents] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState(null);
  const Django_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  // fetch the School Teachers
  useEffect(() => {
    if (schoolData.id) {
      fetch(`${Django_URL}/teachersapi/${schoolData.id}/`)
        .then((res) => res.json())
        .then((data) => {
          setSchoolTeachers(data);
        });
    }
  }, [schoolData.id]);

  

  // fetch the School Admin
  useEffect(() => {
    if (schoolData.id) {
      fetch(`${Django_URL}/adminsapi/admins/${schoolData.id}/`)
        .then((res) => res.json())
        .then((data) => {
          setSchoolAdmin(data);
        });
    }
  }, [schoolData.id]);

  // fetch the School Bursar later
  return (
    <>
      <section className="d-flex flex-column align-items-center justify-content-center my-5 py-2">
        {/* <Link href={'/accounts'}>
          Students Card
        </Link> */}
        <div className="card my-4 py-2 px-2 rounded">
          <div
            className="row align-items-center justify-content-center py-4"
            style={{ maxWidth: "950px" }}
          >
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              {schoolData && schoolData.Schoollogo ? (
                <div className="mb-0 mb-md-5 text-center">
                  <img
                    src={schoolData.Schoollogo_url}
                    alt="logo"
                    className="mb-0 mb-md-3 rounded-circle"
                    style={{ width: "70%", maxWidth: "300px" }}
                  />
                  <h4 className="d-none d-md-block">{schoolData.Schoolname}</h4>
                </div>
              ) : null}
            </div>

            {/* The Portals Card */}
            <div className="col-md-6 py-4 px-3">
              <h5 className="text-center">
                Welcome to {schoolData.Schoolname}, School Portal
              </h5>
              <p className="text-center">
                The School Portal is a platform that allows students, teachers,
                bursars and admin to access the schools information and
                resources.
              </p>
              {loginState ? (
                <div className="py-4">
                  <Loginform
                    datalist={
                      selectedPortal === "students"
                        ? schoolStudents
                        : selectedPortal === "teachers"
                        ? schoolTeachers
                        : schoolAdmin
                    }
                    setStudents ={setSchoolStudents}
                    classeslist={schoolData.classes}
                    selectedPortal={selectedPortal}
                    setLoginState={setLoginState}
                  />
                </div>
              ) : (
                <div className="row px-4">
                  <div className="col-md-6">
                    <div className="card d-flex flex-column align-items-center p-4 me-0 me-md-3">
                      <div className="mb-3 student-portal-icon p-3 shadow-sm ">
                        <FaUserGraduate style={{ fontSize: "40px" }} />
                      </div>
                      <h6 className="text-center mb-3">Students Portal</h6>
                      <button
                        className="btn btn-sm student-portal-button"
                        onClick={() => {
                          setSelectedPortal("students");
                          setLoginState(true);
                        }}
                      >
                        log into Portal
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card d-flex flex-column align-items-center p-4 me-0 me-md-3">
                      <div className="mb-3 teacher-portal-icon p-3 shadow-sm">
                        <FaUserTie style={{ fontSize: "40px" }} />
                      </div>
                      <h6 className="text-center mb-3">Teachers Portal</h6>
                      <button
                        className="btn btn-sm teacher-portal-button"
                        onClick={() => {
                          setSelectedPortal("teachers");
                          setLoginState(true);
                        }}
                      >
                        log into Portal
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card d-flex flex-column align-items-center p-4 me-0 me-md-3">
                      <div className="mb-3 bursar-portal-icon p-3 shadow-sm">
                        <FaMoneyBillTrendUp style={{ fontSize: "40px" }} />
                      </div>
                      <h6 className="text-center mb-3">Bursar</h6>
                      <button
                        className="btn btn-sm bursar-portal-button"
                        // onClick={() => {
                        //   setSelectedPortal("bursar");
                        //   setLoginState(true);
                        // }}
                      >
                        log into Portal
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card d-flex flex-column align-items-center p-4 me-0 me-md-3">
                      <div className="mb-3 admin-portal-icon p-3 shadow-sm">
                        <FaUserLock style={{ fontSize: "40px" }} />
                      </div>
                      <h6 className="text-center mb-3">Admin Portal</h6>
                      <button
                        className="btn btn-sm admin-portal-button"
                        onClick={() => {
                          setSelectedPortal("admin");
                          setLoginState(true);
                        }}
                      >
                        log into Portal
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
