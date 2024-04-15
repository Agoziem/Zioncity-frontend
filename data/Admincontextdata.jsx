"use client";
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({});
  const [ updatedAdminData,setData ] = useLocalStorage('adminData', {});

  useEffect(() => {
    if (Object.keys(updatedAdminData).length) {
      setAdminData(updatedAdminData);
    }
  }, [updatedAdminData]);

  const updateAdminData = (newData) => {
    setAdminData(newData);
  };

  return (
    <AdminContext.Provider value={{ adminData, updateAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
