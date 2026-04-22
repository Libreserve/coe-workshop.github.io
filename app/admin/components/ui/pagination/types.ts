export interface PaginationProps {
  total: number;
  currentPage: number;
  onChange: (page: number) => void;
  siblings?: number;
  boundaries?: number;
}
