"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { TUserSession, UserContextType } from "./user.type";
import { userReducer } from "./user.reducer";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, dispatchUser] = useReducer(userReducer, {
    userId: null,
    name: null,
  });

  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
