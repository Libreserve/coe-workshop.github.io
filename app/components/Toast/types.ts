type Variant = "success" | "warning" | "error";

export interface ToastProps {
  Title: string;
  Description: string;
  Variant: Variant;
}

export const VariantStyle = {
  success: { color: "var(--green-400)", icon: "/Toast/success.svg" },
  warning: { color: "var(--green-400)", icon: "/Toast/warning.svg" },
  error: { color: "var(--red-400)", icon: "/Toast/error.svg" },
} as const;
