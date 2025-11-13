interface DisplayDates {
    year: string
    month: string
    day: string
}

interface CalendarButton{
    disable: boolean
    id: number
    text: string
    OnClick: () => void;
    
}