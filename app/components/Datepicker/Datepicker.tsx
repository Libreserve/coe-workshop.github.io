'use client'
import {useEffect, useState} from "react";
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
function DateTable({year, month, day, selectedDate, OnClick}:DateTable) {
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
                for (let i = lastDateOfPrevMonth - lastDayOfprevMonth; i <= lastDateOfPrevMonth; i++ ) {   
                        dates.push(
                            <button key={`${prevMonth.getMonth()}-${i}`} disabled={true} className={``} onClick={() => OnClick(i)}>{i}</button>
                        )
                    }
                for (let i = 1; i <= curMonth.getDate(); i++) {
                        const isSelected = selectedYear === curMonth.getFullYear() &&
                            selectedMonth === curMonth.getMonth() &&
                            selectedDay === i;
                        console.log(isSelected)
                        dates.push(
                            <button key={`${curMonth.getMonth()}-${i}`} disabled={false} className={`${isSelected ?  styles.today : ''}`} onClick={() => OnClick(i)}>{i}</button>
                        )
                    }
                for (let i = nextMonth.getDay(); i < 7; i++) {
                        dates.push(
                            <button key={`${nextMonth.getMonth()}-${i}`} disabled={true} className={``} onClick={() => OnClick(i - firstDayOfNextMonth + firstDateOfNextMonth)}>{i - firstDayOfNextMonth + firstDateOfNextMonth}</button>
                        )    
                    }
                return dates;
            })()}
        </>
    );
};

function MonthTable({months, year,  selectedDate,  OnClick}:MonthTable) {
    return(
        <>
            {
                months.map(((m, index) => {
                    const isSelected = selectedDate.getFullYear() === year &&
                        selectedDate.getMonth() === index;
                    return (
                        <button key={`${index}${m.name}`} 
                            className={`${isSelected ?  styles.today : ''}`} 
                            onClick={() => OnClick(index)} >{m.abbr} 
                        </button>
                    );
                }))
            }
        </>
    );
};

function YearTable({startYear, selectedDate, OnClick}:YearTable ) {
    return (
        <>
            {(() => {
                const years = []
                for (let i = startYear - 6; i <= startYear + 5; i++ ) {                    
                    const isSelected = selectedDate.getFullYear() === i;
                    years.push(
                        <button 
                            key={`year-${i}`} 
                            disabled={false} 
                            className={`${isSelected ?  styles.today : ''}`} 
                            onClick={() => OnClick(i)}>{i}</button>
                    )
                }
                return years;
            })()}
        </>
    );
}

function DatePicker() {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const currentDay = new Date();
    const [year, setYear] = useState(currentDay.getFullYear()); 
    const [month, setMonth] = useState(currentDay.getMonth());
    const [date, setDate] = useState(currentDay.getDate());
    const [century, setCentury] = useState(currentDay.getFullYear())
    const [showMonth, setShowMonth] = useState(false);
    const [showYear, setShowYear] = useState(false);
    // const [view, setView] = useState<"date" | "month" | "year" | "closed">("closed");
    
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
        <div className={styles.datepicker_container}>
            {
                !showPicker && !showMonth && !showYear ? (
                    <input type="text" className={styles.date_input} 
                    readOnly={true}
                    placeholder="select date" 
                    value={selectedDate.toLocaleDateString("en-GB", {year:"numeric", month:"2-digit", day:"2-digit"}) } 
                    onClick={() => {setShowPicker(!showPicker)}} 
                    />
                ) : (
                    <></>
                )
            }
            {/* picker */}
            
            {/* date table */}
            {
                showPicker ? (
                    <div className={styles.datepicker} >
                        <div className={styles.header} >
                            <button className={styles.prev} onClick={() => decreaseMonth()} >prev</button>
                                <div onClick={() => {setShowMonth(!showMonth); setShowPicker(!showPicker)}}>
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
                                day={date} 
                                selectedDate={selectedDate}
                                OnClick={(day:number) => {setSelectedDate(new Date(year, month, day)); setShowPicker(!showPicker)}}>
                            </DateTable>
                        </div>
                    </div>
                ) : (
                    <>
                    </>
                )
            }
            
            {/* month table */}
            {
                showMonth ? (
                    <>
                    <div className={styles.datepicker} style={{display:`${showPicker ? "block" : "block"}`} }>
                    <div className={styles.header}>
                        <button className={styles.prev} onClick={() => updateYear(-1)} >prev</button>
                            <div onClick={() => {setShowMonth(!showMonth); setShowYear(!showYear)}}>{year}</div>
                        <button className={styles.next} onClick={() => updateYear(1)}>next</button>
                    </div>
                    <div className={styles.month_input}>
                        <MonthTable
                            months={months}
                            year={year}
                            selectedDate={selectedDate}
                            OnClick={(month:number) => {
                                setSelectedDate(new Date(year, month, date)); 
                                setShowMonth(!showMonth); 
                                setShowPicker(!showPicker);
                                setMonth(month)
                            }}
                        >
                        </MonthTable>
                    </div>
            </div>
                </>
                ) : (
                    <></>
                )
            }

            {/* year table */}
                {
                    showYear ? (
                        <div className={styles.datepicker} style={{display:`${showPicker ? "block" : "block"}`} }>
                        <>
                    <div className={styles.header}>
                        <button className={styles.prev} onClick={() => updateCentury(-12)} >prev</button>
                            <div>{`${century - 6} - ${century + 5}`}</div>
                        <button className={styles.next} onClick={() => updateCentury(12)}>next</button>
                    </div>
                    <div className={styles.month_input}>
                        <YearTable
                            startYear={century}
                            selectedDate={selectedDate}
                            OnClick={(year:number) => {
                                setSelectedDate(new Date(year, month, date)); 
                                setShowYear(!showYear); 
                                setShowMonth(!showMonth); 
                                setYear(year);
                            }}       
                        >
                        </YearTable>
                    </div>
                    </>
                </div>
                    ) : (
                        <></>
                    )
                }
                
        </div>

        {/* picker undo overlay */}
        { showPicker || showMonth || showYear ? (
            <div className={styles.undo_datepicker_overlay}
            onClick={()=>{setShowPicker(false); setShowMonth(false); setShowYear(false) }}>
            </div>
        ) : (
            <></>
        ) }
        </>
    );
}

export default DatePicker;