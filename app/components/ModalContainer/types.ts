import { ReactNode } from "react";

export interface ModalContainerProps {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
}
