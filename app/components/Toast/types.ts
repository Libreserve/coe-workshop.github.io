import React from "react";
import SuccessIcon from "../Icon/SuccessIcon";
import { IconProps } from "../Icon/Type";
import WarningIcon from "../Icon/WarningIcon";
import ErrorIcon from "../Icon/ErrorIcon";

export type Variant = "success" | "warning" | "error";
type Position =
  | "top-right"
  | "top-left"
  | "top-center"
  | "center-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

type CssVarStyle = React.CSSProperties & Record<string, string>;
export interface ToastProps {
  Position: Position;
}

export interface ToastItem {
  id: number | string;
  title: string;
  description: string;
  variant: Variant;
}

export const VariantStyle: Record<string, { color: string; icon: React.ComponentType<IconProps> }> = {
  success: { color: "var(--success-green)", icon: SuccessIcon },
  warning: { color: "var(--warning-yellow)", icon: WarningIcon },
  error: { color: "var(--error-red)", icon: ErrorIcon },
} as const;

export const positionStyle: Record<string, CssVarStyle> = {
  "top-right": {
    "--top": "0",
    "--right": "0",
    "--direction": "column-reverse",
    "--slide": "-70px",
    "--fade": "30px",
    "--in": "translateX(100px)",
  },
  "top-left": {
    "--top": "0",
    "--left": "0",
    "--direction": "column-reverse",
    "--slide": "-70px",
    "--fade": "-30px",
    "--in": "translateX(-100px)",
  },
  "top-center": {
    "--top": "0",
    "--left": "50%",
    "--direction": "column-reverse",
    "--slide": "-70px",
    "--fade": "30px",
    "--in": "translateY(-100px)",
    transform: "translateX(-50%)",
  },
  "bottom-right": {
    "--bottom": "0",
    "--right": "0",
    "--direction": "column",
    "--slide": "70px",
    "--fade": "-30px",
    "--in": "translateX(100px)",
  },
  "bottom-left": {
    "--bottom": "0",
    "--left": "0",
    "--direction": "column",
    "--out": "70px",
    "--in": "translateX(-100px)",
  },
  "bottom-center": {
    "--bottom": "0",
    "--left": "50%",
    "--direction": "column",
    "--out": "70px",
    "--in": "translateY(40px)",
    transform: "translateX(-50%)",
  },
};

export interface ToastProps {
  Position: Position;
}

export interface ToastItem {
  id: number | string;
  title: string;
  description: string;
  variant: Variant;
}

export interface ToastContextTypeProps {
  addToastStack: (title: string, description: string, variant: Variant) => void;
  toastStack: {
    id: number;
    title: string;
    description: string;
    variant: Variant;
  }[];
}
