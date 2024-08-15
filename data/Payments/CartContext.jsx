"use client";
import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  const [CartTotal, setCartTotal] = useState(0);

  // fetch Cart
  return (
    <CartContext.Provider
      value={{
        Cart,
        setCart,
        CartTotal,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
const useCartContext = () => React.useContext(CartContext);

export { useCartContext, CartContextProvider };
