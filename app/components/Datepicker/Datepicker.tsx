"use client";
import { useState } from "react";
import styles from "./Datepicker.module.scss";
import Image from "next/image";
import type {
  DatePickerProps,
  DateTableProps,
  MonthTableProps,
  YearTableProps,
} from "./Datepicker.type";
import { ViewMode } from "./Datepicker.type";

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
  { name: "Sunday", abbr: "Sun", ToomAbbr: "S" },
  { name: "Monday", abbr: "Mon", ToomAbbr: "M" },
  { name: "Tuesday", abbr: "Tue", ToomAbbr: "T" },
  { name: "Wednesday", abbr: "Wed", ToomAbbr: "W" },
  { name: "Thursday", abbr: "Thu", ToomAbbr: "T" },
  { name: "Friday", abbr: "Fri", ToomAbbr: "F" },
  { name: "Saturday", abbr: "Sat", ToomAbbr: "S" },
];

const DateTable = ({ year, month, selectedDate, onSelect }: DateTableProps) => {
  const prevMonth = new Date(year, month, 0);
  const lastDateOfPrevMonth = prevMonth.getDate();
  const lastDayOfprevMonth = prevMonth.getDay();
  const curMonth = new Date(year, month + 1, 0);
  const nextMonth = new Date(year, month + 1, 1);
  const firstDayOfNextMonth = nextMonth.getDay();
  const firstDateOfNextMonth = nextMonth.getDate();
  return (
    <>
      {(() => {
        const dates = [];
        for (
          let day = lastDateOfPrevMonth - lastDayOfprevMonth;
          day <= lastDateOfPrevMonth;
          day++
        ) {
          dates.push(
            <button
              key={`prev-${day}`}
              disabled={true}
              className={``}
              onClick={() => onSelect(day)}
            >
              {day}
            </button>,
          );
        }
        for (let day = 1; day <= curMonth.getDate(); day++) {
          const isSelected =
            selectedDate?.getFullYear() === curMonth.getFullYear() &&
            selectedDate?.getMonth() === curMonth.getMonth() &&
            selectedDate?.getDate() === day;
          dates.push(
            <button
              key={`cur-${day}`}
              disabled={false}
              className={`${isSelected ? styles.selected : ""}`}
              onClick={() => onSelect(day)}
            >
              {day}
            </button>,
          );
        }
        for (let day = nextMonth.getDay(); day < 7; day++) {
          dates.push(
            <button
              key={`next-${day}`}
              disabled={true}
              className={``}
              onClick={() =>
                onSelect(day - firstDayOfNextMonth + firstDateOfNextMonth)
              }
            >
              {day - firstDayOfNextMonth + firstDateOfNextMonth}
            </button>,
          );
        }
        return dates;
      })()}
    </>
  );
};

const MonthTable = ({
  months,
  year,
  selectedDate,
  onSelect,
}: MonthTableProps) => {
  return (
    <>
      {months.map((m, index) => {
        const isSelected =
          selectedDate?.getFullYear() === year &&
          selectedDate?.getMonth() === index;
        return (
          <button
            key={`${index}${m.name}`}
            className={`${isSelected ? styles.selected : ""}`}
            onClick={() => onSelect(index)}
          >
            {m.abbr}
          </button>
        );
      })}
    </>
  );
};

const YearTable = ({ startYear, selectedDate, onSelect }: YearTableProps) => {
  return (
    <>
      {(() => {
        const years = [];
        for (let year = startYear - 6; year <= startYear + 5; year++) {
          const isSelected = selectedDate?.getFullYear() === year;
          years.push(
            <button
              key={`year-${year}`}
              disabled={false}
              className={`${isSelected ? styles.selected : ""}`}
              onClick={() => onSelect(year)}
            >
              {year}
            </button>,
          );
        }
        return years;
      })()}
    </>
  );
};

const DatePicker = ({ onChange, value }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const dummy = new Date();
  const [year, setYear] = useState(dummy.getFullYear());
  const [month, setMonth] = useState(dummy.getMonth());
  const [day, setDay] = useState(dummy.getDate());
  const [century, setCentury] = useState(dummy.getFullYear());
  const [view, setView] = useState<ViewMode>(ViewMode.CLOSED);
  const [active, setActive] = useState(false);
  const [prevSelectedDate, setPrevSelectedDate] = useState<Date | null>();
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
      setDay(dummy.getDate());
      setMonth(dummy.getMonth());
      setYear(dummy.getFullYear());
      onChange?.(null);
    } else {
      setSelectedDate(updatedDate);
      setPrevSelectedDate(updatedDate);
      onChange?.(updatedDate);
      setDay(day);
    }
    setView(ViewMode.CLOSED);
    setActive(true);
  };
  const handleOnSelectMonth = (month: number) => {
    const updatedDate = new Date(year, month, day);
    setSelectedDate(updatedDate);
    onChange?.(updatedDate);
    setMonth(month);
    setView(ViewMode.DATE);
    setActive(true);
  };
  const handleOnSelectYear = (year: number) => {
    const updatedDate = new Date(year, month, day);
    setSelectedDate(updatedDate);
    onChange?.(updatedDate);
    setYear(year);
    setView(ViewMode.MONTH);
    setActive(true);
  };
  const handleUndoOverlay = () => {
    setView(ViewMode.CLOSED);
    setPrevSelectedDate(new Date(day, year, month));
  };
  //codes under this line were written by the guy who things he knows css, He thought for smooth transition he designed to render about four layout for one component
  return (
    <div className={styles.datepicker_container}>
      <div
        className={`${styles.placeholder}${
          view === ViewMode.CLOSED ? "" : "_closed"
        }`}
        onClick={() => {
          setView(ViewMode.DATE);
        }}
      >
        <Image
          src={"calendar.svg"}
          alt={"calendar"}
          width={18}
          height={18}
          className={styles.placeholder_img}
        />
        {!selectedDate || !active ? (
          <div>Calendar</div>
        ) : (
          <>
            {`${selectedDate.getDate()} ${
              months[selectedDate.getMonth()].name
            } ${selectedDate.getFullYear() % 100}`}
          </>
        )}
      </div>
      {/* picker */}
      <div
        className={`${styles.datepicker}${
          view !== ViewMode.CLOSED ? "" : "_closed"
        }`}
      >
        <div className={styles.header}>
          <button className={styles.prev_button} onClick={() => prev(view)}>
            <Image
              src={"arrow.svg"}
              alt={"prev"}
              width={19}
              height={19}
              className={""}
            />
          </button>
          <div className={styles.change_table}>
            {view === ViewMode.DATE && (
              <div
                onClick={() => {
                  setView(ViewMode.MONTH);
                }}
              >
                <div>{months[month].name}</div>
                <div>{year}</div>
              </div>
            )}

            {view === ViewMode.MONTH && (
              <div
                onClick={() => {
                  setView(ViewMode.YEAR);
                }}
              >
                {year}
              </div>
            )}

            {view === ViewMode.YEAR && (
              <div>{`${century - 6} - ${century + 5}`}</div>
            )}
          </div>
          <button className={styles.next_button} onClick={() => next(view)}>
            <Image
              src={"arrow.svg"}
              alt={"next"}
              width={19}
              height={19}
              className={""}
            />
          </button>
          {/* <div
            className={styles.clear}
            onClick={() => {
              onChange?.();
              setView(ViewMode.CLOSED);
              setActive(false);
            }}
          >
            clear
          </div> */}
        </div>
        {/* date table */}
        <div
          className={`${styles.datepicker_date}${
            view === ViewMode.DATE ? "" : "_closed"
          }`}
        >
          <div className={styles.days}>
            {days.map((d, index) => {
              return <span key={`${index}${d.name}`}>{d.ToomAbbr}</span>;
            })}
          </div>
          <div className={styles.dates_input}>
            <DateTable
              year={year}
              month={month}
              selectedDate={selectedDate}
              onSelect={(day: number) => handleOnSelectDay(day)}
            ></DateTable>
          </div>
        </div>
        {/* month table */}
        <div
          className={`${styles.datepicker_month}${
            view === ViewMode.MONTH ? "" : "_closed"
          }`}
        >
          <div className={styles.month_input}>
            <MonthTable
              months={months}
              year={year}
              selectedDate={selectedDate}
              onSelect={(month: number) => handleOnSelectMonth(month)}
            ></MonthTable>
          </div>
        </div>
        {/* year table */}
        <div
          className={`${styles.datepicker_year}${
            view === ViewMode.YEAR ? "" : "_closed"
          }`}
        >
          <div className={styles.year_input}>
            <YearTable
              startYear={century}
              selectedDate={selectedDate}
              onSelect={(year: number) => handleOnSelectYear(year)}
            ></YearTable>
          </div>
        </div>
      </div>

      {/* picker undo overlay */}
      {!(view === ViewMode.CLOSED) && (
        <div
          className={styles.undo_datepicker_overlay}
          onClick={() => handleUndoOverlay()}
        ></div>
      )}
    </div>
  );
};

export default DatePicker;
