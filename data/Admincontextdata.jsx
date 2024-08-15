"use client";
import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  const [adminID, setAdminID] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [admins, setAdmins] = useState([]);

  const [storedAdminID, setStoredAdminID] = useLocalStorage("adminID", adminID);

  useEffect(() => {
    if (storedAdminID) {
      setAdminID(storedAdminID);
    }
  }, [storedAdminID]);

  // ------------------------------------------------
  // function to fetch all admin data
  // ------------------------------------------------
  const fetchAllAdmins = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/admin/${schoolID}`
      );
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------------
  // function to fetch admin data by ID
  // ------------------------------------------------
  const fetchAdminByID = async (adminID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/admin/${schoolID}/${adminID}`
      );
      if (response.ok) {
        const data = await response.json();
        return data; //returns admin data
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (storedAdminID) {
      fetchAdminByID(storedAdminID).then((data) => {
        setAdminData(data);
      });
    }
  }, [storedAdminID]);

  // ------------------------------------------------
  // function to update admin data
  // ------------------------------------------------
  const updateAdminData = async (adminID, data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/admin/${schoolID}/${adminID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAdminData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------------------------------
  // function to delete admin data
  // ------------------------------------------------
  const deleteAdminData = async (adminID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/admin/${schoolID}/${adminID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setAdminData({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminID,
        adminData,
        setAdminData,
        admins,
        setAdmins,
        fetchAllAdmins,
        fetchAdminByID,
        updateAdminData,
        deleteAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
