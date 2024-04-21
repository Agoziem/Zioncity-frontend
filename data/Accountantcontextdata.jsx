"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
const AccountantContext = createContext();

const AccountantContextProvider = ({ children }) => {
  const [accountantData, setaccountantData] = useState({});


 const [storedAccountantData, setStoredAccountantData] = useLocalStorage('accountantData', accountantData)
 
 useEffect(() => {
    if(storedAccountantData){
      setaccountantData(storedAccountantData)
    }
 },[storedAccountantData])

    useEffect(() => {
      setStoredAccountantData('accountantData', accountantData);
    }, [accountantData]);

  // Step 4: Provide the context value to children components
  return (
    <AccountantContext.Provider value={{ accountantData, setaccountantData }}>
      {children}
    </AccountantContext.Provider>
  );
};

export { AccountantContext, AccountantContextProvider };