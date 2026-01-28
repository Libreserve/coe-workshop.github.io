export interface DatePickerProps {
  onChange?: (value?: Date | undefined | null) => void;
  value?: Date | undefined | null;
  disable?: boolean;
  onTop?: boolean;
  placeholder?: string;
  datePlaceholderFormat?: number;
  required?: boolean;
  isCasual?: boolean;
  label?: string;
}

export interface CalendarButtonProps {
  disabled: boolean;
  idx: number;
  text: string;
  onSelect: () => void;
}

export interface DateTableProps {
  year: number;
  month: number;
  selectedDate: Date | undefined | null;
  isCasual?: boolean;
  onSelect: (date: number) => void;
}

export interface MonthTableProps {
  months: {
    name: string;
    abbr: string;
  }[];
  year: number;
  selectedDate: Date | undefined | null;
  onSelect: (month: number) => void;
}

export interface YearTableProps {
  startYear: number;
  selectedDate: Date | undefined | null;
  onSelect: (year: number) => void;
}
export enum ViewMode {
  DATE = "date",
  MONTH = "month",
  YEAR = "year",
  CLOSED = "closed",
}
