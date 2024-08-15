"use client";
import React, { createContext, useEffect, useState } from "react";

const ChatroomContext = createContext();

const ChatroomContextProvider = ({ children }) => {
  const [schoolID, setSchoolID] = useState(process.env.NEXT_PUBLIC_SCHOOL_ID);
  
  return (
    <ChatroomContext.Provider
      value={{
      }}
    >
      {children}
    </ChatroomContext.Provider>
  );
};
const useChatroomContext = () => React.useContext(ChatroomContext);

export { useChatroomContext, ChatroomContextProvider };
