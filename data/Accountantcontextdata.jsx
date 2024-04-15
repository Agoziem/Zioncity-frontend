"use client";
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';

const AccountantContext = createContext();

const AccountantContextProvider = ({ children }) => {
  const [accountantData, setaccountantData] = useState({});
  const [ updatedaccountantData,setData ] = useLocalStorage('accountantData', {});

  useEffect(() => {
    if (Object.keys(updatedaccountantData).length) {
      setaccountantData(updatedaccountantData);
    }
  } ,[updatedaccountantData]);

  // Step 3: Define function to update admin data
  const updateAccountantData = (newData) => {
    setaccountantData(newData);
  };

  // Step 4: Provide the context value to children components
  return (
    <AccountantContext.Provider value={{ accountantData, updateAccountantData }}>
      {children}
    </AccountantContext.Provider>
  );
};

export { AccountantContext, AccountantContextProvider };