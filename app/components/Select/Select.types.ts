export interface SelectProps {
  value?: string; //value when user select
  onChange: (value: string) => void; //setValue
  label?: string; //input label tag
  require?: boolean; //must full fill this input
  options: string[]; 
  placeholder?: string; 
  errorMessage?: string; //error message display
  onTop?: boolean; //date form have on top on buttom placeholder
  disable?: boolean; //disable input
}
