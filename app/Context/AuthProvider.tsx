"use client";
import React, { createContext, useContext, ReactNode } from "react";

type AuthContextType = {
  user: any | null;
  login?: (username: string, password: string) => void;
  logout?: () => void;
};

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value: AuthContextType = {
    user: null,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
