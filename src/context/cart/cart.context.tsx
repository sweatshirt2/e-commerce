"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useReducer,
} from "react";
import { useUser } from "../user/user.context";
import { TCartAction, TCartContextType, TUserCart } from "./cart.type";
import { cartReducer } from "./cart.reducer";

const CartContext = createContext<TCartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [cart, dispatchCart] = useReducer(cartReducer, {
    userId: user.userId,
    products: [],
  });

  useEffect(() => {
    dispatchCart({ type: "CLEAR_CART" });
    dispatchCart({ type: "SET_USER_ID", payload: { userId: user.userId } });
  }, [user.userId]);

  const upsertItem = (
    productName: string,
    productId: string,
    quantity: string
  ) => {
    dispatchCart({
      type: "UPSERT_ITEM",
      payload: { productName, productId, quantity },
    });
  };

  const removeFromCart = (productId: string) => {
    dispatchCart({ type: "REMOVE_ITEM", payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: string) => {
    dispatchCart({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatchCart({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatchCart,
        upsertItem,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
