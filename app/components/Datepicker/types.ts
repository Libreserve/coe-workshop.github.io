export interface DatePicker {
    onChange?: (value?:Date | string) => void
    value?: Date | string 
}

export interface CalendarButton{
    disabled: boolean
    idx: number
    text: string
    cssclass: string
    onSelect: () => void
}

export interface DateTable {
    year: number
    month: number
    selectedDate: Date
    onSelect: (date:number) => void  
}

export interface MonthTable {
    months: 
        {
            name: string
            abbr: string
        }[]
    year: number
    selectedDate: Date
    onSelect: (month:number) => void
}

export  interface YearTable {
    startYear: number
    selectedDate: Date
    onSelect:(year:number) => void
}
