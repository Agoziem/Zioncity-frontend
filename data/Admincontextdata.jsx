"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({});

  
  const [storedAdminData, setStoredAdminData] = useLocalStorage('adminData', adminData)

  useEffect(() => {
    if(storedAdminData){
      setAdminData(storedAdminData)
    }
  },[storedAdminData])

  // function to fetch all admin data
  // function to fetch admin data by ID
  // function to update admin data
  // function to delete admin data

  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
