"use client";

import React, { ReactNode, useState } from "react";
import { ToastContext } from "./ToastContext";
import { ToastProps } from "./types";

function ToastProvider({ children }: { children: ReactNode }) {
  const [Toast, setToast] = useState<ToastProps>();

  //   return <ToastContext.Provider value={}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
