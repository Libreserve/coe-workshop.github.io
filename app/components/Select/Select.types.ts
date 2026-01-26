export interface SelectProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  require?: boolean;
  options: string[];
  placeholder?: string;
  errorMessage?: string;
  onTop?: boolean;
  disable?: boolean;
}
