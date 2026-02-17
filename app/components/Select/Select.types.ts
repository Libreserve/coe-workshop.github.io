export interface SelectProps {
  value?: string | number; //value when user select
  onChange: (value: string | number) => void; //setValue
  label?: string; //input label tag
  require?: boolean; //must full fill this input
  options: string[];
  placeholder?: string;
  errorMessage?: string; //error message display
  onTop?: boolean; //date form have on top on buttom placeholder
  disable?: boolean; //disable input
  icon?: string; //add icon from left side
  iconSize?: number;
  iconWidth?: number;
  iconHeight?: number;
}
