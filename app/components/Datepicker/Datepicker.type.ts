export interface DatePickerProps {
    onChange?: (value?:Date | undefined) => void
    value?: Date | undefined 
}

export interface CalendarButtonProps {
    disabled: boolean
    idx: number
    text: string
    onSelect: () => void
}

export interface DateTableProps {
    year: number
    month: number
    selectedDate: Date
    onSelect: (date:number) => void  
}

export interface MonthTableProps {
    months: 
        {
            name: string
            abbr: string
        }[]
    year: number
    selectedDate: Date
    onSelect: (month:number) => void
}

export  interface YearTableProps {
    startYear: number
    selectedDate: Date
    onSelect:(year:number) => void
}
export enum ViewMode {
    DATE = "date",
    MONTH = "month",
    YEAR = "year",
    CLOSED = "closed"
}