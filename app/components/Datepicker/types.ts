interface DisplayDates {
    year: string
    month: string
    day: string
}

interface CalendarButton{
    disabled: boolean
    idx: number
    text: string
    cssclass: string
    OnClick: () => void
}

interface DateTable {
    year: number
    month: number
    day: number
    selectedDate: Date
    OnClick: (date:number) => void  
}

interface MonthTable {
    months: 
        {
            name: string
            abbr: string
        }[]
    year: number
    selectedDate: Date
    OnClick: (month:number) => void
}

interface YearTable {
    startYear: number
    selectedDate: Date
    OnClick:(year:number) => void
}