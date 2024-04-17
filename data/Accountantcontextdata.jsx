"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getDataOrDefault,storeData } from '@/utils/Localstoragehandler';

const AccountantContext = createContext();

const AccountantContextProvider = ({ children }) => {
  const [accountantData, setaccountantData] = useState({});
  const [updateddata, setUpdateddata] = useState({});

  useEffect(() => {
    setaccountantData(getDataOrDefault('accountantData', {}));
  }, []);
  

    useEffect(() => {
      storeData('accountantData', accountantData);
    }, [accountantData]);

  // Step 4: Provide the context value to children components
  return (
    <AccountantContext.Provider value={{ accountantData, setaccountantData }}>
      {children}
    </AccountantContext.Provider>
  );
};

export { AccountantContext, AccountantContextProvider };