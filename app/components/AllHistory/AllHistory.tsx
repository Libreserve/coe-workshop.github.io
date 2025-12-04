"use client";
import HistoryCard from "../HistoryCard/HistoryCard";
import DropDown from "../DropDown/DropDown";
import DatePicker from "../Datepicker/Datepicker";
import { useState, useEffect } from "react";
import styles from "../AllHistory/AllHistory.module.scss";
import type { Transaction, Status, History } from "./types"
// pagination and filter รอฝั่งเขียน api 
// เราต้องเขียนแบบserver and user component ไหมน้า < ไม่หรอกปวดหัว
const BASE_URL = "http://localhost:8000";
const mock = {
  transactions: [
    {
      email: "kritsada.ba@kkumail.com",
      toolList: [
        {
          name: "Arduino",
          image:
            "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
          quantity: 5,
        },
        {
          name: "Hammer",
          image:
            "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
          quantity: 1,
        },
      ],
      status: "pending",
      startDay: "2025-11-17T10:00:00.000Z",
    },
    {
      email: "kritsada.ba@kkumail.com",
      toolList: [{ name: "Saw", image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png", quantity: 2 }],
      status: "returned",
      startDay: "2025-11-15T14:30:00.000Z",
    },
    {
      email: "kritsada.ba@kkumail.com",
      toolList: [
        {
          name: "Arduino",
          image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
          quantity: 5,
        },
        {
          name: "Hammer",
          image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
          quantity: 1,
        },
        {
          name: "Hammer",
          image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
          quantity: 1,
        },
        {
          name: "Hammer",
          image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
          quantity: 1,
        },
        {
          name: "Hammer",
          image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
          quantity: 1,
        },
      ],
      status: "returned",
      startDay: "2025-11-16T10:00:00.000Z",
    },
  ]
}
// YYYY-MM-DD HH:MM:SS
const getDbDateTime = (date: Date):string => {
  return date.toLocaleString("en-CA", { hour12: false }).replace(",", "");
} 

const AllHistory = () => {
  const [status, setStatus] = useState<Status | string>("");
  const [data, setData] = useState<History>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  // const [page, setPage] = useState<Number>(1);
  // const [hasMore, setHasMore] = useState(true);

  const loadData = async () => {
    const params = new URLSearchParams();
    // params.append("page", String(page));
    params.append("limit", String(10));
    if(selectedDate) params.append("startDay", getDbDateTime(selectedDate));
    if(status) params.append("status", status);
    try {
      const res = await fetch(`${BASE_URL}/history?${params.toString()}`); 
      const data = await res.json()
      // if (data.length === 0) setHasMore(false);
      // connect to prev load 
      // unfinished
      setData(data);
    }
    catch(error) {
      setData(mock as History);
      console.log(error);
      console.error("Iter เขีนนapiดีๆ")
    }
  };
  
  useEffect(() => {
    // setPage(1);
    // setHasMore(true);
    // setData({});
    loadData(); 
    console.log('change ja changge');
  }, [status, selectedDate])
  return (
    <div className={styles.container}>
      <div className={styles.table_hearder}>
        <div className={styles.header}>
          <h1 >
            History
          </h1>
          <p className={styles.sub_title}>
            Duis aute irure dolor in reprehenderit.
          </p>
        </div>
        <div className={styles.filter}>
          <div className={styles.datepicker}>
            <DatePicker
            value={selectedDate}
            onChange={(value) => {setSelectedDate(value as Date);}}
            ></DatePicker>
          </div>
          <div className={styles.status_filter}>
            <DropDown value={status} 
            onChange={(value) => {
              setStatus(value as Status); 
              }}
            ></DropDown>
          </div>  
        </div>
      </div>
      <div className={styles.table_body}>
        {
          data ? (data?.transactions?.map((transaction, index)=> {
            return (
              <HistoryCard  transaction={transaction as Transaction}  email={transaction.email} key={`${index}`}></HistoryCard>
            )
          })) : (
            <p className={styles.fall_back}>
              no history available...🗿
            </p>
          )
        }
      </div>
    </div>
  );
}

export default AllHistory;
  