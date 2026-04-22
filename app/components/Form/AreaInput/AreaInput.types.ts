export interface AreaInputProps {
  label?: string;
  placeholder?: string;
  require?: boolean;
  value: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}
