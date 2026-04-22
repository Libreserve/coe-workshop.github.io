export interface SelectProps<T extends string = string> {
  value?: T; // value when user select
  onChange: (value: T) => void; // setValue
  label?: string; // input label tag
  require?: boolean; // must full fill this input
  options: T[];
  placeholder?: string;
  errorMessage?: string; // error message display
  onTop?: boolean; // date form have on top on bottom placeholder
  disable?: boolean; // disable input
  icon?: string; // add icon from left side
  iconSize?: number;
  iconWidth?: number;
  iconHeight?: number;
  size?: "sm" | "md";
}
