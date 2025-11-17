'use client'
import {use, useEffect, useState} from "react";
import styles from "./Datepicker.module.scss"
import Image from "next/image";

const months = [
  { name: "January", abbr: "Jan" },
  { name: "February", abbr: "Feb" },
  { name: "March", abbr: "Mar" },
  { name: "April", abbr: "Apr" },
  { name: "May", abbr: "May" },
  { name: "June", abbr: "Jun" },
  { name: "July", abbr: "Jul" },
  { name: "August", abbr: "Aug" },
  { name: "September", abbr: "Sep" },
  { name: "October", abbr: "Oct" },
  { name: "November", abbr: "Nov" },
  { name: "December", abbr: "Dec" }
];
const days = [
  { name: "Sunday", abbr: "Sun",ToomAbbr: "S" },
  { name: "Monday", abbr: "Mon",ToomAbbr: "M" },
  { name: "Tuesday", abbr: "Tue",ToomAbbr: "T" },
  { name: "Wednesday", abbr: "Wed",ToomAbbr: "W" },
  { name: "Thursday", abbr: "Thu",ToomAbbr: "T" },
  { name: "Friday", abbr: "Fri",ToomAbbr: "F" },
  { name: "Saturday", abbr: "Sat",ToomAbbr: "S" }
];

function DateTable({year, month, selectedDate, onSelect}:DateTable) {
    const prevMonth = new Date(year, month, 0);
    const lastDateOfPrevMonth = prevMonth.getDate();
    const lastDayOfprevMonth = prevMonth.getDay();
    const curMonth = new Date(year, month + 1, 0)
    const nextMonth = new Date(year, month+ 1, 1);
    const firstDayOfNextMonth = nextMonth.getDay();
    const firstDateOfNextMonth = nextMonth.getDate();
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();
    return (
        <>
            {(() => {
                const dates = []
                for (let day = lastDateOfPrevMonth - lastDayOfprevMonth; day <= lastDateOfPrevMonth; day++ ) {   
                        dates.push(
                            <button key={`prev-${day}`} disabled={true} className={``} onClick={() => onSelect(day)}>{day}</button>
                        )
                    }
                for (let day = 1; day <= curMonth.getDate(); day++) {
                        const isSelected = selectedYear === curMonth.getFullYear() &&
                            selectedMonth === curMonth.getMonth() &&
                            selectedDay === day;
                        dates.push(
                            <button key={`cur-${day}`} disabled={false} className={`${isSelected ?  styles.selected : ''}`} onClick={() => onSelect(day)}>{day}</button>
                        )
                    }
                for (let day = nextMonth.getDay(); day < 7; day++) {
                        dates.push(
                            <button key={`next-${day}`} disabled={true} className={``} onClick={() => onSelect(day - firstDayOfNextMonth + firstDateOfNextMonth)}>{day - firstDayOfNextMonth + firstDateOfNextMonth}</button>
                        )    
                    }
                return dates;
            })()}
        </>
    );
};

function MonthTable({months, year,  selectedDate,  onSelect}:MonthTable) {
    return(
        <>
            {
                months.map(((m, index) => {
                    const isSelected = selectedDate.getFullYear() === year &&
                        selectedDate.getMonth() === index;
                    return (
                        <button key={`${index}${m.name}`} 
                            className={`${isSelected ?  styles.selected : ''}`} 
                            onClick={() => onSelect(index)} >{m.abbr} 
                        </button>
                    );
                }))
            }
        </>
    );
};

function YearTable({startYear, selectedDate, onSelect}:YearTable ) {
    return (
        <>
            {(() => {
                const years = []
                for (let year = startYear - 6; year <= startYear + 5; year++ ) {                    
                    const isSelected = selectedDate.getFullYear() === year;
                    years.push(
                        <button 
                            key={`year-${year}`} 
                            disabled={false} 
                            className={`${isSelected ?  styles.selected : ''}`} 
                            onClick={() => onSelect(year)}>{year}</button>
                    )
                }
                return years;
            })()}
        </>
    );
}

function DatePicker({value, onChange}:DatePicker) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [year, setYear] = useState(selectedDate.getFullYear()); 
    const [month, setMonth] = useState(selectedDate.getMonth());
    const [date, setDate] = useState(selectedDate.getDate());
    const [century, setCentury] = useState(selectedDate.getFullYear())
    const [view, setView] = useState<"date" | "month" | "year" | "closed">("closed");
    const [active, setActive] = useState(false);

    function next(viewMode: string) {
        switch (viewMode) {
            case "date":
                if (month === 11) setYear(year + 1);
                    setMonth((month + 1) % 12);
                break;
            case "month":
                    setYear( year + 1);
                break;
            // ... more cases
            case "year":
                setCentury(century + 12);
                break;
            default:
       
        }
    }

    function prev(viewMode: string) {
        switch (viewMode) {
            case "date":
                if (month === 0 ) setYear(year - 1) ;
                    setMonth((month - 1 + 12) % 12);
                break;
            case "month":
                    setYear( year - 1);
                break;
            // ... more cases
            case "year":
                setCentury(century - 12);
                break;
            default:
       
        }
    }

    //codes under this line were written by the guy who things he knows css, He thought for smooth transition he designed to render about four layout for one component  
    return (
            <div className={styles.datepicker_container}>
                <div className={`${styles.placeholder}${view === "closed" ? "" : "_closed"}`} 
                    onClick={() => {setView("date")}}>
                        {/* <Image
                        src={"calendar.svg"}
                        alt={"calendar"}
                        width={18}
                        height={18}
                        className={styles.placeholder_img}
                    /> */}
                        {
                            !active ? (
                                <div>
                                    Calendar
                               </div>
                            ) : (
                            <>
                                {`${selectedDate.getDate()} ${months[selectedDate.getMonth()].name} ${selectedDate.getFullYear() % 100}`}
                            </>
                            )
                        }
                </div>
                {/* picker */}
                <div className={`${styles.datepicker}${view !== "closed" ? "" : "_closed"}`} >
                    <div className={styles.header} >
                        <button className={styles.prev_button} onClick={() => prev(view)} >
                            <Image
                                src={"arrow.svg"}
                                alt={"prev"}
                                width={19}
                                height={19}
                                className={''}
                            />
                        </button>
                        <div className={styles.change_table}>  
                            {view === "date" && (
                            <div onClick={() => {setView("month")}} >
                                <div >{months[month].name}</div>
                                <div>{year}</div>
                            </div>
                            )}

                            {view === "month" && (
                                <div onClick={() => {setView("year")}}>{year}</div>
                            )}

                            {view === "year" && (
                                <div>{`${century - 6} - ${century + 5}`}</div>
                            )}
                        </div>
                        <button className={styles.next_button} onClick={() => next(view)}>
                            <Image
                                src={"arrow.svg"}
                                alt={"next"}
                                width={19}
                                height={19}
                                className={''}
                            />
                        </button>
                        <div className={styles.clear} onClick={() => {
                            onChange?.("");
                            setView("closed");
                            setActive(false);
                        }}>clear</div>
                    </div>
                    {/* date table */}
                    <div className={`${styles.datepicker_date}${view === "date" ? "" : "_closed"}`}>                        
                        <div className={styles.days}>
                            {
                                days.map(((d, index) => {
                                    return (
                                        <span key={`${index}${d.name}`}>{d.ToomAbbr}</span>
                                    );
                                }))
                            }
                        </div>
                        <div className={styles.dates_input}>
                            <DateTable 
                                year={year} 
                                month={month} 
                                selectedDate={selectedDate}
                                onSelect={(day:number) => {
                                    console.log('same day');
                                    setSelectedDate(new Date(year, month, day));
                                    setView("closed");
                                    setActive(true);
                                    onChange?.(selectedDate);
                                }}>
                            </DateTable>
                        </div>
                        
                    </div>
                    {/* month table */}                    
                    <div className={`${styles.datepicker_month}${view === "month" ? "" : "_closed"}`} >
                        <div className={styles.month_input}>
                            <MonthTable
                                months={months}
                                year={year}
                                selectedDate={selectedDate}
                                onSelect={(month:number) => {
                                    setSelectedDate(new Date(year, month, date));
                                    onChange?.(selectedDate); 
                                    setMonth(month)
                                    setView("date")
                                    setActive(true);
                                }}
                            >
                            </MonthTable>
                        </div>
                    </div>
                    {/* year table */}
                    <div className={`${styles.datepicker_year}${view === "year" ? "" : "_closed"}`} >
                        <div className={styles.year_input}>
                            <YearTable
                                startYear={century}
                                selectedDate={selectedDate}
                                onSelect={(year:number) => {
                                    setSelectedDate(new Date(year, month, date));
                                    onChange?.(selectedDate);
                                    setYear(year);
                                    setView("month")
                                    setActive(true);
                                }}       
                            >
                            </YearTable>
                        </div>
                    </div>
                </div>

        {/* picker undo overlay */}
        { 
            !(view === "closed") && (
            <div className={styles.undo_datepicker_overlay}
                onClick={()=>{
                setView("closed");
                }}>
            </div>
        ) 
        }
        </div>
    );
}

export default DatePicker;