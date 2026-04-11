export interface TextInputProps {
  title?: string;
  placeholder?: string;
  require?: boolean;
  value: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
  backgroundColor?: string;
}
