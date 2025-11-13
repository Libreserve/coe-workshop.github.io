import React from "react";

type Variant = "success" | "warning" | "error";
type Position =
  | "top-right"
  | "top-left"
  | "top-center"
  | "center-right"
  | "center-right"
  | "center-left"
  | "center-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";
export interface ToastProps {
  Title: string;
  Description: string;
  Variant: Variant;
}

export const VariantStyle: Record<string, { color: string; icon: string }> = {
  success: { color: "var(--green-400)", icon: "/Toast/success.svg" },
  warning: { color: "var(--green-400)", icon: "/Toast/warning.svg" },
  error: { color: "var(--red-400)", icon: "/Toast/error.svg" },
} as const;

export const positionStyle: Record<string, React.CSSProperties> = {
  
};
