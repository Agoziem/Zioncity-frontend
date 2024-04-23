"use client";
import React, { useContext, useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { TeacherContext } from "@/data/Teachercontextdata";
import { StudentsContext } from "@/data/Studentcontextdata";
import { AdminContext } from "@/data/Admincontextdata";
import useLocalStorage from "@/hooks/useLocalStorage";

const Loginform = ({
  datalist,
  handleClasschange,
  classeslist,
  selectedPortal,
  loadingStudents,
  setLoginState,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [usercredentials, setUsercredentials] = useState({
    id: "",
    password: "",
  });
  const Django_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;
  const { teacherData, setTeacherData } = useContext(TeacherContext);
  const { StudentData, setStudentData } = useContext(StudentsContext);
  const { adminData, setAdminData } = useContext(AdminContext);
  const [storedTeacherdata, setStoredTeacherdata] = useLocalStorage(
    "teacherData",
    {}
  );
  const [storedStudentdata, setStoredStudentdata] = useLocalStorage(
    "StudentData",
    {}
  );
  const [storedadminData, setStoredadmindata] = useLocalStorage(
    "adminData",
    {}
  );
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const apiurl = () => {
    if (selectedPortal === "students") {
      return `${Django_URL}/studentsapi/confirmStudent/`;
    } else if (selectedPortal === "teachers") {
      return `${Django_URL}/teachersapi/confirmTeacher/`;
    } else {
      return `${Django_URL}/adminsapi/confirmAdmin/`;
    }
  };

  const setuserdetails = (userdetails) => {
    if (selectedPortal === "students") {
      setStudentData(userdetails);
      setStoredStudentdata(userdetails);
      setUsercredentials({ id: "", password: "" });
      router.push("/students-portal");
    } else if (selectedPortal === "teachers") {
      setTeacherData(userdetails);
      setStoredTeacherdata(userdetails);
      setUsercredentials({ id: "", password: "" });
      router.push("/teachers-portal");
    } else {
      setAdminData(userdetails);
      setStoredadmindata(userdetails);
      setUsercredentials({ id: "", password: "" });
      router.push("/admin-portal");
    }
  };

  const handleSubmit = async (e, url) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usercredentials),
      });

      if (response.ok) {
        const data = await response.json();
        setuserdetails(data);
      } else {
        alert("Invalid ID or Password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-3">
      <form>
        {selectedPortal === "students" && (
          <div className="mb-3">
            <label htmlFor="classselect" className="form-label">
              Select Class
            </label>
            <select
              className="form-select"
              id="classselect"
              onChange={handleClasschange}
            >
              <option>Select Class</option>
              {classeslist?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="dataselect" className="form-label">
            Select{" "}
            {selectedPortal === "students"
              ? "Student"
              : selectedPortal === "teachers"
              ? "Teacher"
              : "Admin"}
          </label>
          <select
            className="form-select"
            id="dataselect"
            onChange={(e) =>
              setUsercredentials({ ...usercredentials, id: e.target.value })
            }
            value={usercredentials.id}
          >
            {loadingStudents && <option>Loading Students...</option>}

            {datalist.length === 0 && <option>No data available</option>}

            {datalist.length > 0 && (
              <option>
                Select{" "}
                {selectedPortal === "students"
                  ? "Student"
                  : selectedPortal === "teachers"
                  ? "Teacher"
                  : "Admin"}
              </option>
            )}
            {datalist?.map((data) => (
              <option key={data.id} value={data.id}>
                {data.surname} {data.firstName || data.firstname}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            {selectedPortal === "students"
              ? "Student"
              : selectedPortal === "teachers"
              ? "Teacher"
              : "Admin"}{" "}
            ID
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter your ID"
              value={usercredentials.password}
              onChange={(e) =>
                setUsercredentials({
                  ...usercredentials,
                  password: e.target.value,
                })
              }
            />

            <label
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEye className="h4 mb-0 text-muted" />
              ) : (
                <FaEyeSlash className="h4 mb-0 text-muted" />
              )}
            </label>
          </div>
        </div>

        <div className="mt-5 d-flex align-items-center">
          <button
            type="button"
            className="btn btn-accent-primary me-3"
            onClick={() => setLoginState(false)}
          >
            <IoArrowUndoSharp className="me-2 h5" />
            Back to home
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e, apiurl())}
          >
            go to dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
