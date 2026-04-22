import { ReactNode } from "react";

export interface Options {
  title: string;
  action: (id?: string) => void;
}

export interface OptionActionProps {
  id?: string;
  children: ReactNode;
  options: Options[];
  lastDelete?: boolean;
}
