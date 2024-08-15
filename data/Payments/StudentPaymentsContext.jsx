"use client";
import React, { createContext, useEffect, useState } from "react";

const StudentPaymentsContext = createContext();

const StudentPaymentsContextProvider = ({ children }) => {
  const [paymenttickets, setPaymenttickets] = useState([]);
  const [paymentticket, setPaymentticket] = useState({
    paymenttickettotal: 0,
    paymentticketitems: [],
  });
  const [paymentitem, setPaymentitem] = useState({});
  const [paymentitems, setPaymentitems] = useState([]);

  // fetch payment tickets
  // fetch payment ticket
  // fetch payment items
  // fetch payment item
  return (
    <StudentPaymentsContext.Provider
      value={{
        paymenttickets,
        setPaymenttickets,
        paymentticket,
        setPaymentticket,
        paymentitem,
        setPaymentitem,
        paymentitems,
        setPaymentitems,
      }}
    >
      {children}
    </StudentPaymentsContext.Provider>
  );
};
const useStudentPaymentsContext = () => React.useContext(StudentPaymentsContext);

export { useStudentPaymentsContext, StudentPaymentsContextProvider };
