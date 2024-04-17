"use client";
import React, { createContext, useEffect, useState } from 'react';
import { getDataOrDefault, storeData } from '@/utils/Localstoragehandler';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(getDataOrDefault('userData', {}));
  }, []);

  useEffect(() => {
    storeData('userData', userData);
  }, [userData]);

  // Step 4: Provide the context value to children components
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };