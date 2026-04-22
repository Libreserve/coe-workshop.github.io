export interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  require?: boolean;
  value: string;
  onChange?: (value: string) => void;
}
