import { ReactNode } from "react";

const ModalSlice = ({
  openedd,
  onClose,
  children,
}: {
  children: ReactNode;
}) => {
  return <div>{children}</div>;
};

export default ModalSlice;
