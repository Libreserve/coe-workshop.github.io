import { createContext } from "react";

interface ToastContextTypeProps {
  addToastStack: () => void;
}

export const ToastContext = createContext<ToastContextTypeProps | undefined>(
  undefined
);
