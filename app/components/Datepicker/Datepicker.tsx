// ignore tsx first 
// day index and month are zero base 
'use client'
import {useEffect, useState} from "react";
import styles from "./Datepicker.module.scss"
import next from "next";
// clcik outside picker area = unchange 
// click unselected button to select date 
// click selected button to unselected and return to show all 

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

function DateTable({year, month, day, OnClick}:DateTable) {
    const prevMonth = new Date(year, month, 0);
    const lastDateOfPrevMonth = prevMonth.getDate();
    const lastDayOfprevMonth = prevMonth.getDay();
    const curMonth = new Date(year, month + 1, 0)
    const nextMonth = new Date(year, month+ 1, 1);
    const firstDayOfNextMonth = nextMonth.getDay();
    const firstDateOfNextMonth = nextMonth.getDate();
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
                        // const isToday = month === currentDay.getMonth() && year === currentDay.getFullYear() && currentDay.getDate() === i;
                        dates.push(
                            // dateButton(i, false, `${curMonth.getMonth()}-${i}`)
                            <button key={`${curMonth.getMonth()}-${i}`} disabled={false} className={``} onClick={() => OnClick(i)}>{i}</button>
                        )
                    }
                for (let i = nextMonth.getDay(); i < 7; i++) {
                        <button key={`${nextMonth.getMonth()}-${i}`} disabled={true} className={``} onClick={() => OnClick(i - firstDayOfNextMonth + firstDateOfNextMonth)}>{i - firstDayOfNextMonth + firstDateOfNextMonth}</button>
                    }
                return dates;
            })()}
        </>
    );
};

function MonthTable({months, OnClick}:MonthTable) {
    return(
        <>
            {
                months.map(((m, index) => {
                    return (
                        <button key={`${index}${m.name}`} className={``} onClick={() => OnClick(index)} >{m.abbr} </button>
                    );
                }))
            }
        </>
    );
};

function DatePicker() {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const currentDay = new Date();
    const [year, setYear] = useState(currentDay.getFullYear()); 
    const [month, setMonth] = useState(currentDay.getMonth());
    const [date, setDate] = useState(currentDay.getDate());
    
    function increaseMonth() {
        if (month === 11) setYear(year + 1);
        setMonth((month + 1) % 12);
    }
    function  decreaseMonth() {
        if (month === 0 ) setYear(year - 1) ;
        setMonth((month - 1 + 12) % 12)
    }

    return (
        <>
        <div className={styles.datepicker_container}>
            <input type="text" className={styles.date_input} placeholder="select date" onClick={() => setShowPicker(!showPicker)} value={selectedDate.toLocaleDateString("en-GB", {year:"numeric", month:"2-digit", day:"2-digit"}) } readOnly={true}/>
            {/* picker */}
            <div className={styles.datepicker} style={{display:`${showPicker ? "block" : "none"}`} }>
                <div className={styles.header}>
                    <button className={styles.prev} onClick={() => decreaseMonth()} >prev</button>
                    <div>
                        <select className={styles.month_input}  value={month}  onChange={e => {setMonth(parseInt(e.target.value)); console.log(e.target.value); console.log(month)}}>
                            {
                                months.map(((m, index) => {
                                    return (
                                        <option key={`${index}${m.name}`} value={index} >{m.abbr} </option>
                                    );
                                }))
                            }
                        </select>
                        <input type="number" className={styles.year_input} value={year} onChange={e => {setYear(parseInt(e.target.value));}}/>
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
                    <DateTable year={year} month={month} day={date} OnClick={(day:number) => {setSelectedDate(new Date(year, month, day)); setShowPicker(!showPicker)}}></DateTable>
                </div>
            </div>
        </div>

        {/* picker undo overlay */}
        { showPicker ? (
            <div className={styles.undo_datepicker_overlay}
            onClick={()=>setShowPicker(!showPicker)}>
            </div>
        ) : (
            <></>
        ) }
        </>
    );
}

export default DatePicker;