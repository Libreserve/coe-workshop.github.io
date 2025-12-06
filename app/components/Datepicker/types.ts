export interface DatePickerProps {
  onChange?: (value?: Date | string) => void;
  value?: Date | string;
}

export interface CalendarButtonProps {
  disabled: boolean;
  idx: number;
  text: string;
  cssclass: string;
  onSelect: () => void;
}

export interface DateTableProp {
  year: number;
  month: number;
  selectedDate: Date;
  onSelect: (date: number) => void;
}

export interface MonthTableProps {
  months: {
    name: string;
    abbr: string;
  }[];
  year: number;
  selectedDate: Date;
  onSelect: (month: number) => void;
}

export interface YearTableProps {
  startYear: number;
  selectedDate: Date;
  onSelect: (year: number) => void;
}
