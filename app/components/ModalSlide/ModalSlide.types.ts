import { ReactNode } from "react";

export interface ModalSliceProps {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
}
