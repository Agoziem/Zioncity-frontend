"use client";
import React, { createContext, useEffect, useState } from "react";

const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <MessagesContext.Provider
      value={{
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
const useMessagesContext = () => React.useContext(MessagesContext);

export { useMessagesContext, MessagesContextProvider };
