'use client'
import {use, useEffect, useState} from "react";
import styles from "./Datepicker.module.scss"

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
  { name: "Sunday", abbr: "Sun" },
  { name: "Monday", abbr: "Mon" },
  { name: "Tuesday", abbr: "Tue" },
  { name: "Wednesday", abbr: "Wed" },
  { name: "Thursday", abbr: "Thu" },
  { name: "Friday", abbr: "Fri" },
  { name: "Saturday", abbr: "Sat" }
];

// hard code a h
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
                            <button key={`cur-${day}`} disabled={false} className={`${isSelected ?  styles.today : ''}`} onClick={() => onSelect(day)}>{day}</button>
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
                            className={`${isSelected ?  styles.today : ''}`} 
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
                            className={`${isSelected ?  styles.today : ''}`} 
                            onClick={() => onSelect(year)}>{year}</button>
                    )
                }
                return years;
            })()}
        </>
    );
}

function DatePicker({value, onChange}:DatePicker) {
    const [year, setYear] = useState(value.getFullYear()); 
    const [month, setMonth] = useState(value.getMonth());
    const [date, setDate] = useState(value.getDate());
    const [century, setCentury] = useState(value.getFullYear())
    const [view, setView] = useState<"date" | "month" | "year" | "closed">("closed");
    const [active, setActive] = useState(false);
    
    function increaseMonth() {
        if (month === 11) setYear(year + 1);
        setMonth((month + 1) % 12);
    }
    function  decreaseMonth() {
        if (month === 0 ) setYear(year - 1) ;
        setMonth((month - 1 + 12) % 12);
    }
    function updateYear(increament:number) {
        setYear( year + increament);
    }
    function updateCentury(increament:number) {
        setCentury(century + increament);
    }

    return (
        <>
        {view === "closed" && !active ? (
            <div className={styles.datepicker_container}>
                <div onClick={() => {setView("date")}}>calender</div>
            </div>
            ) : (
                
        <div className={styles.datepicker_container}>
            <input type="text" className={`${styles.date_input}${view === "closed" ? "" : "_closed"}`} 
                readOnly={true}
                placeholder="select date" 
                value={value.toLocaleDateString("en-GB", {year:"numeric", month:"2-digit", day:"2-digit"}) }
                onClick={() => {setView("date");}} 
            />
            {/* picker */}
            
            {/* date table */}
            <div>

            </div>
            <div className={`${styles.datepicker}${view === "date" ? "" : "_closed"}`} >
                <div className={styles.header} >
                    <button className={styles.prev} onClick={() => decreaseMonth()} >prev</button>
                        <div onClick={() => {setView("month")}}>
                            <div className={styles.today}>{months[month].name}</div>
                            <div>{year}</div>
                        </div>
                    <button className={styles.next} onClick={() => increaseMonth()}>next</button>
                </div>
                <div className={styles.days}>
                    {
                        days.map(((d, index) => {
                            return (
                                <span key={`${index}${d.name}`}>{d.abbr}</span>
                            );
                        }))
                    }
                </div>
                <div className={styles.dates}>
                    <DateTable 
                        year={year} 
                        month={month} 
                        selectedDate={value}
                        onSelect={(day:number) => {
                            onChange(new Date(year, month, day));
                            setView("closed");
                            setActive(true);
                        }}>
                    </DateTable>
                </div>
            </div>
            
            
            {/* month table */}
            
            <div className={`${styles.datepicker_month}${view === "month" ? "" : "_closed"}`} >
                <div className={styles.header}>
                    <button className={styles.prev} onClick={() => updateYear(-1)} >prev</button>
                        <div onClick={() => {setView("year")}}>{year}</div>
                    <button className={styles.next} onClick={() => updateYear(1)}>next</button>
                </div>
                <div className={styles.month_input}>
                    <MonthTable
                        months={months}
                        year={year}
                        selectedDate={value}
                        onSelect={(month:number) => {
                            onChange(new Date(year, month, date)); 
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
                <div className={styles.header}>
                    <button className={styles.prev} onClick={() => updateCentury(-12)} >prev</button>
                        <div>{`${century - 6} - ${century + 5}`}</div>
                    <button className={styles.next} onClick={() => updateCentury(12)}>next</button>
                </div>
                <div className={styles.month_input}>
                    <YearTable
                        startYear={century}
                        selectedDate={value}
                        onSelect={(year:number) => {
                            onChange(new Date(year, month, date)); 
                            setYear(year);
                            setView("month")
                            setActive(true);
                        }}       
                    >
                    </YearTable>
                </div>
            </div>
        </div>
            )}

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
        </>
    );
}

export default DatePicker;