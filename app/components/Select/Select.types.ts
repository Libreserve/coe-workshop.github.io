export interface SelectOption<T extends string = string> {
  label: string;
  value: T;
}

export interface SelectProps<T extends string = string> {
  value?: T;
  defaultValue?: T;
  onChange: (value: T) => void;
  label?: string;
  require?: boolean;
  options: SelectOption<T>[] | T[];
  placeholder?: string;
  errorMessage?: string;
  onTop?: boolean;
  disable?: boolean;
  icon?: string;
  iconSize?: number;
  iconWidth?: number;
  iconHeight?: number;
  size?: "sm" | "md" | "lg";
}
