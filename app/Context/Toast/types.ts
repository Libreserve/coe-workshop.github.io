import React from "react";

export type Variant = "success" | "warning" | "error";

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

type CssVarStyle = React.CSSProperties & Record<string, string>;

export const VariantStyle: Record<string, { color: string; icon: string }> = {
  success: { color: "var(--green-400)", icon: "/Toast/success.svg" },
  warning: { color: "var(--green-400)", icon: "/Toast/warning.svg" },
  error: { color: "var(--red-400)", icon: "/Toast/error.svg" },
} as const;

export const positionStyle: Record<string, CssVarStyle> = {
  "top-right": { "--top": "0", "--right": "0" },
  "top-left": { "--top": "0", "--left": "0" },
  "top-center": {
    "--top": "0",
    "--left": "50%",
    transform: "translateX(-50%)",
  },
  "center-left": {
    "--top": "50%",
    "--left": "0",
    transform: "translateY(-50%)",
  },
  "center-right": {
    "--top": "50%",
    "--right": "0",
    transform: "translateY(-50%)",
  },
  "center-center": {
    "--top": "50%",
    "--left": "50%",
    transform: "translate(-50%,-50%)",
  },
  "bottom-right": { "--bottom": "0", "--right": "0" },
  "bottom-left": { "--bottom": "0", "--left": "0" },
  "bottom-center": {
    "--bottom": "0",
    "--left": "50%",
    transform: "translateX(-50%)",
  },
};

export interface ToastContextTypeProps {
  addToastStack: (title: string, description: string, variant: Variant) => void;
  toastStack: {
    id: number;
    title: string;
    description: string;
    variant: Variant;
  }[];
}
