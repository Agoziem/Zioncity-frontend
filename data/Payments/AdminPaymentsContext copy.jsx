"use client";
import React, { createContext, useEffect, useState } from "react";

const AdminPaymentsContext = createContext();

const AdminPaymentsContextProvider = ({ children }) => {
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
    <AdminPaymentsContext.Provider
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
    </AdminPaymentsContext.Provider>
  );
};
const useAdminPaymentsContext = () => React.useContext(AdminPaymentsContext);

export { useAdminPaymentsContext, AdminPaymentsContextProvider };
