export interface PaginationProps {
  total: number;
  currentState: number;
  setCurrentState: (value: number) => void;
}
