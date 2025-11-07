"use client";

import { createContext } from "react";
import { ToastProps } from "./types";

export interface ToastContextType {
  ToastList: ToastProps[];
  onOpend: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
