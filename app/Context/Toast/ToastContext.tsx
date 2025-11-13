import { createContext } from "react";
import { ToastContextTypeProps } from "./types";


export const ToastContext = createContext<ToastContextTypeProps | undefined>(
  undefined
);
