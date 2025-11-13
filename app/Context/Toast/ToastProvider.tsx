"use client";

import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { ToastContext } from "./ToastContext";
import { Variant } from "./types";
import { ToastContextTypeProps } from "./types";

const ToastProvider = () => {
  const toastID = useRef(0);
  const [toastStack, setToastStack] = useState<
    { id: number; title: string; description: string; variant: Variant }[]
  >([]);

  const addToastStack = useCallback(
    (title: string, description: string, variant: Variant) => {
      const id = toastID.current++;
      setToastStack((prev) => [
        ...prev,
        {
          id,
          title: title,
          description: description,
          variant: variant,
        },
      ]);
      setTimeout(() => {
        setToastStack((prev) => prev.filter((item) => item.id !== id));
      }, 3000);
    },
    []
  );

  const value = useMemo<ToastContextTypeProps>(
    () => ({
      addToastStack,
      toastStack,
    }),
    [addToastStack]
  );

  return <ToastContext.Provider value={value}></ToastContext.Provider>;
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider must use in ToastContext only");
  return ctx;
};

export default ToastProvider;
