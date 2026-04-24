"use client";

import { useState, useEffect, type ReactNode } from "react";
import styles from "../Datepicker/Datepicker.module.scss";
import SvgIconMono from "../Icon/SvgIconMono";
import { ViewMode } from "../Datepicker/Datepicker.type";

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
  { name: "December", abbr: "Dec" },
];

const days = [
  { name: "Sunday", ToomAbbr: "S" },
  { name: "Monday", ToomAbbr: "M" },
  { name: "Tuesday", ToomAbbr: "T" },
  { name: "Wednesday", ToomAbbr: "W" },
  { name: "Thursday", ToomAbbr: "T" },
  { name: "Friday", ToomAbbr: "F" },
  { name: "Saturday", ToomAbbr: "S" },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  isCasual?: boolean;
}

export const Calendar = ({
  value,
  onChange,
  isCasual = true,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [year, setYear] = useState(value?.getFullYear() || today.getFullYear());
  const [month, setMonth] = useState(value?.getMonth() ?? today.getMonth());
  const [century, setCentury] = useState(value?.getFullYear() || today.getFullYear());
  const [view, setView] = useState<ViewMode>(ViewMode.DATE);
  const [prevSelectedDate, setPrevSelectedDate] = useState<Date | null>();

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setYear(value.getFullYear());
      setMonth(value.getMonth());
      setCentury(value.getFullYear());
    }
  }, [value]);

  const next = (viewMode: ViewMode) => {
    switch (viewMode) {
      case ViewMode.DATE:
        if (month === 11) setYear(year + 1);
        setMonth((month + 1) % 12);
        break;
      case ViewMode.MONTH:
        setYear(year + 1);
        break;
      case ViewMode.YEAR:
        setCentury(century + 12);
        break;
      default:
    }
  };

  const prev = (viewMode: ViewMode) => {
    switch (viewMode) {
      case ViewMode.DATE:
        if (month === 0) setYear(year - 1);
        setMonth((month - 1 + 12) % 12);
        break;
      case ViewMode.MONTH:
        setYear(year - 1);
        break;
      case ViewMode.YEAR:
        setCentury(century - 12);
        break;
      default:
    }
  };

  const handleOnSelectDay = (day: number) => {
    const updatedDate = new Date(year, month, day);
    const isSameDate =
      day === prevSelectedDate?.getDate() &&
      month === prevSelectedDate?.getMonth() &&
      year === prevSelectedDate?.getFullYear();
    if (isSameDate) {
      setSelectedDate(null);
      setPrevSelectedDate(null);
      onChange?.(null);
    } else {
      setSelectedDate(updatedDate);
      setPrevSelectedDate(updatedDate);
      onChange?.(updatedDate);
    }
  };

  const handleOnSelectMonth = (m: number) => {
    setMonth(m);
    setView(ViewMode.DATE);
  };

  const handleOnSelectYear = (y: number) => {
    setYear(y);
    setView(ViewMode.MONTH);
  };

  const prevMonth = new Date(year, month, 0);
  const lastDateOfPrevMonth = prevMonth.getDate();
  const lastDayOfprevMonth = prevMonth.getDay();
  const curMonth = new Date(year, month + 1, 0);
  const nextMonth = new Date(year, month + 1, 1);
  const firstDayOfNextMonth = nextMonth.getDay();
  const firstDateOfNextMonth = nextMonth.getDate();

  const dateCells: ReactNode[] = [];
  for (let day = lastDateOfPrevMonth - lastDayOfprevMonth; day <= lastDateOfPrevMonth; day++) {
    dateCells.push(
      <button key={`prev-${day}`} disabled={true} className="">
        {day}
      </button>
    );
  }
  for (let day = 1; day <= curMonth.getDate(); day++) {
    const isSelected = selectedDate
      ? selectedDate.getFullYear() === curMonth.getFullYear() &&
        selectedDate.getMonth() === curMonth.getMonth() &&
        selectedDate.getDate() === day
      : false;
    const cellDate = new Date(year, month, day);
    const isCasualDay = cellDate >= today;
    dateCells.push(
      <button
        key={`cur-${day}`}
        disabled={isCasual ? !isCasualDay : false}
        className={`${isSelected ? styles.selected : ""}`}
        onClick={() => handleOnSelectDay(day)}
      >
        {day}
      </button>
    );
  }
  for (let day = nextMonth.getDay(); day < 7; day++) {
    dateCells.push(
      <button key={`next-${day}`} disabled={true} className="">
        {day - firstDayOfNextMonth + firstDateOfNextMonth}
      </button>
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.prev_button} onClick={() => prev(view)}>
          <SvgIconMono src="/arrow.svg" alt="prev" width={14} height={14} className="" />
        </button>
        <div className={styles.change_table}>
          {view === ViewMode.DATE && (
            <div onClick={() => setView(ViewMode.MONTH)}>
              <h2>{months[month].name}</h2>
              <h2>{year}</h2>
            </div>
          )}
          {view === ViewMode.MONTH && (
            <div onClick={() => setView(ViewMode.YEAR)}>
              <h2>{year}</h2>
            </div>
          )}
          {view === ViewMode.YEAR && (
            <div>
              <h2>{`${century - 6} - ${century + 5}`}</h2>
            </div>
          )}
        </div>
        <button className={styles.next_button} onClick={() => next(view)}>
          <SvgIconMono src="/arrow.svg" alt="next" width={14} height={14} className="" />
        </button>
      </div>
      <div className={`${styles.datepicker_date}${view === ViewMode.DATE ? "" : "_closed"}`}>
        <div className={styles.days}>
          {days.map((d, index) => (
            <span key={`${index}${d.name}`}>{d.ToomAbbr}</span>
          ))}
        </div>
        <div className={styles.dates_input}>{dateCells}</div>
      </div>
      <div className={`${styles.datepicker_month}${view === ViewMode.MONTH ? "" : "_closed"}`}>
        <div className={styles.month_input}>
          {months.map((m, index) => {
            const isSelected = selectedDate?.getFullYear() === year && selectedDate?.getMonth() === index;
            return (
              <button
                key={`${index}${m.name}`}
                className={`${isSelected ? styles.selected : ""}`}
                onClick={() => handleOnSelectMonth(index)}
              >
                {m.abbr}
              </button>
            );
          })}
        </div>
      </div>
      <div className={`${styles.datepicker_year}${view === ViewMode.YEAR ? "" : "_closed"}`}>
        <div className={styles.year_input}>
          {(() => {
            const years = [];
            for (let y = century - 6; y <= century + 5; y++) {
              const isSelected = selectedDate?.getFullYear() === y;
              years.push(
                <button
                  key={`year-${y}`}
                  disabled={false}
                  className={`${isSelected ? styles.selected : ""}`}
                  onClick={() => handleOnSelectYear(y)}
                >
                  {y}
                </button>
              );
            }
            return years;
          })()}
        </div>
      </div>
    </div>
  );
};