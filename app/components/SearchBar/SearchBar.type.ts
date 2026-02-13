export interface SearchBarProps {
  searching?: string;
  placeholder?: string;
  width?: number;
  iconSize?: number;
  onEnter: (value: string) => void; //setValue
}