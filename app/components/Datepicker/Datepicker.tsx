"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Datepicker.module.scss";
import type {
  DatePickerProps,
  DateTableProps,
  MonthTableProps,
  YearTableProps,
} from "./Datepicker.type";
import { ViewMode } from "./Datepicker.type";
import SvgIconMono from "../Icon/SvgIconMono";
const today = new Date();
today.setHours(0, 0, 0, 0);

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

const DateTable = ({
  year,
  month,
  selectedDate,
  onSelect,
  isCasual = false,
}: DateTableProps) => {
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
          const isSelected = selectedDate
            ? selectedDate?.getFullYear() === curMonth.getFullYear() &&
              selectedDate?.getMonth() === curMonth.getMonth() &&
              selectedDate?.getDate() === day
            : false;
          const cellDate = new Date(year, month, day);
          const isCasualDay = cellDate >= today;
          dates.push(
            <button
              key={`cur-${day}`}
              disabled={isCasual ? !isCasualDay : false}
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

const DatePicker = ({
  onChange,
  value,
  disable = false,
  onTop = false,
  placeholder = "Calendar",
  datePlaceholderFormat = 2,
  required = true,
  isCasual = true,
  label = "วันที่จอง",
  disableLabel = false,
  errorMessage,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [century, setCentury] = useState(today.getFullYear());
  const [view, setView] = useState<ViewMode>(ViewMode.CLOSED);
  const [prevSelectedDate, setPrevSelectedDate] = useState<Date | null>();
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === ViewMode.CLOSED) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setView(ViewMode.CLOSED);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [view]);
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
  // day month year for calculate, selectedDate for display and value
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
    setView(ViewMode.CLOSED);
  };
  const handleOnSelectMonth = (month: number) => {
    setMonth(month);
    setView(ViewMode.DATE);
  };
  const handleOnSelectYear = (year: number) => {
    setYear(year);
    setView(ViewMode.MONTH);
  };

  const getFormatDate = (date: Date, formatType = 0) => {
    const day = date.getDate();
    const month = date.getMonth(); // 0-based
    const year = date.getFullYear();
    const pad = (n: number) => String(n).padStart(2, "0");

    switch (formatType) {
      case 0:
        return `${day} ${months[month].name} ${year % 100}`;
      case 1:
        return `${year}-${pad(month + 1)}-${pad(day)}`;
      case 2:
        return `${pad(day)}/${pad(month + 1)}/${year}`;
      default:
        return `${day} ${months[month].name} ${year % 100}`;
    }
  };
  // const isCasualDate = (date: Date | null) => {
  //   if (!date) return false;
  //   const targetDate = new Date(date.getTime()).setHours(0, 0, 0, 0);
  //   return targetDate >= today.getTime();
  // };

  return (
    <div className={styles.wrapper} ref={datePickerRef}>
      {!disableLabel && (
        <h2 className={styles.label}>
          {label}
          {label && required && <span> *</span>}
        </h2>
      )}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      <div className={styles.datepicker_container}>
        <div
          className={`${styles.placeholder}${
            view === ViewMode.CLOSED ? "" : ""
          }`}
          onClick={() => {
            if (!disable) setView(ViewMode.DATE);
          }}
        >
            <input
              type="text"
              value={
                (selectedDate &&
                  getFormatDate(selectedDate, datePlaceholderFormat)) ||
                ""
              }
              readOnly
              inputMode="none"
              placeholder={placeholder}
            />
            <SvgIconMono
              className={styles.placeholder_img}
              src={"/icon/arrow.svg"}
              alt="arrow"
              width={12}
              height={12}
            ></SvgIconMono>
          </div>
        {/* picker */}
        <div
          className={`${view !== ViewMode.CLOSED ? (onTop ? styles.datepicker_onTop : styles.datepicker) : styles.datepicker_closed}`}
        >
          <div className={styles.header}>
            <button className={styles.prev_button} onClick={() => prev(view)}>
              <SvgIconMono
                src={"/arrow.svg"}
                alt={"prev"}
                width={14}
                height={14}
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
                  <h2>{months[month].name}</h2>
                  <h2>{year}</h2>
                </div>
              )}

              {view === ViewMode.MONTH && (
                <div
                  onClick={() => {
                    setView(ViewMode.YEAR);
                  }}
                >
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
              <SvgIconMono
                src={"/arrow.svg"}
                alt={"next"}
                width={14}
                height={14}
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
                isCasual={isCasual}
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

      </div>
    </div>
  );
};

export default DatePicker;
