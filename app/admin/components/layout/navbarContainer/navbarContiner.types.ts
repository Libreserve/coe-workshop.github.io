import { ReactNode } from "react";

export interface NavbarContainerProps {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
  margin: string;
}
