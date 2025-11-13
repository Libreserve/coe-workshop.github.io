"use client";

import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ToastContext } from "./ToastContext";
import { Variant } from "./types";
import { ToastContextTypeProps } from "./types";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toastID = useRef(0);
  const [toastStack, setToastStack] = useState<
    { id: number; title: string; description: string; variant: Variant }[]
  >([]);

  const addToastStack = useCallback(
    (title: string, description: string, variant: Variant) => {
      const id = toastID.current++;
      console.log("ontoast");
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

  useEffect(() => {
    console.log("Current toastStack:", toastStack);
  }, [toastStack]);

  const value = useMemo<ToastContextTypeProps>(
    () => ({
      addToastStack,
      toastStack,
    }),
    [addToastStack, toastStack]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider must use in ToastContext only");
  return ctx;
};

export default ToastProvider;
