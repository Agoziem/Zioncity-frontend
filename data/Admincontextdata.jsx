"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getDataOrDefault, storeData } from '@/utils/Localstoragehandler';
const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    setAdminData(getDataOrDefault('adminData', {}));
  }, []);

  useEffect(() => {
    storeData('adminData', adminData);
  }, [adminData]);
  

  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
