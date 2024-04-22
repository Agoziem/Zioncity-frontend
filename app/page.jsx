"use client";
import Loginform from "@/components/loginforms/Loginform";
// import MainHeader from "@/components/header/Mainheader/MainHeader";
import Image from "next/image";
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
  const [schoolStudents, setSchoolStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [schoolAdmin, setSchoolAdmin] = useState([]);
  const [selectedClassid, setSelectedClassid] = useState(null);
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

  // fetch the School Students
  const fetchSchoolStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await fetch(
        `${Django_URL}/studentsapi/${schoolData.id}/${selectedClassid}/`
      );
      const data = await res.json();
      setSchoolStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    if (schoolData.id && selectedClassid) {
      fetchSchoolStudents();
    }
  }, [schoolData.id, selectedClassid]);

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
      {/* <MainHeader /> */}
      <section className="d-flex flex-column align-items-center justify-content-center my-5 py-2">
        <div className="card my-5 py-2">
          <div
            className="row align-items-center justify-content-center p-0"
            style={{ maxWidth: "950px" }}
          >
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <div className="mb-5 text-center">
                <Image
                  src="/images/GDD Impact.jpg"
                  alt="logo"
                  width={70}
                  height={70}
                  className=" mb-3 rounded-circle"
                />
                <h4>{schoolData.Schoolname}</h4>
              </div>

              <img
                src="/images/Portalimage3.webp"
                alt="logo"
                className="object-fit-cover "
                style={{ height: "100%", width: "100%" }}
              />
            </div>

            {/* The Portals Card */}
            <div className="col-md-6 py-4 px-3">
              <h5 className="text-center">
                Welcome to {schoolData.Schoolname}, School Portal
              </h5>
              <p className="text-center">
                The School Portal is a platform that allows students, teachers,
                bursars and admin to access the school's information and
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
                    handleClasschange={(e) =>
                      setSelectedClassid(e.target.value)
                    }
                    classeslist={schoolData.classes}
                    selectedPortal={selectedPortal}
                    loadingStudents={loadingStudents}
                    setLoginState={setLoginState}
                  />
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <div className="card d-flex flex-column align-items-center p-4 me-3">
                      <div className="mb-3 student-portal-icon p-3">
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
                    <div className="card d-flex flex-column align-items-center p-4 me-3">
                      <div className="mb-3 teacher-portal-icon p-3">
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
                    <div className="card d-flex flex-column align-items-center p-4 me-3">
                      <div className="mb-3 bursar-portal-icon p-3">
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
                    <div className="card d-flex flex-column align-items-center p-4 me-3">
                      <div className="mb-3 admin-portal-icon p-3">
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
