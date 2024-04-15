"use client";
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children,userID }) => {
  const [userData, setUserData] = useState({});
  const [ updatedUserData,setData ] = useLocalStorage('userData', {});

  useEffect(() => {
    if (Object.keys(updatedUserData).length) {
      setUserData(updatedUserData);
    }
  },[updatedUserData]);

  // Step 3: Define function to update admin data
  const updateUserData = (newData) => {
    setUserData(newData);
  };

  // Step 4: Provide the context value to children components
  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };