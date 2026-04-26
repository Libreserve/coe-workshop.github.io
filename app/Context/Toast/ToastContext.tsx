import { ToastContextTypeProps } from "@/app/components/Toast/types";
import { createContext } from "react";

export const ToastContext = createContext<ToastContextTypeProps | undefined>(
  undefined
);
