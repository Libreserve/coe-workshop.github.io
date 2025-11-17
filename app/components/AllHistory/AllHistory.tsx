"use client";
import HistoryCard from "../HistoryCard/HistoryCard";
import DropDown from "../DropDown/DropDown";
import DatePicker from "../Datepicker/Datepicker";
import { useState } from "react";
import styles from "../AllHistory/AllHistory.module.scss";

const mock_from_api = {
  email: "kritsada.ba@kkumail.com",
  transactions: [
    {
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
      toolList: [{ name: "Saw", image: "/saw.png", quantity: 2 }],
      status: "returned",
      startDay: "2025-11-15T14:30:00.000Z",
    },
    {
      toolList: [
      {
        name: "Arduino",
        image:
          "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
        quantity: 5,
      },
      {
        name: "Hammer",
        image:
          "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
        quantity: 1,
      },
      {
        name: "Hammer",
        image:
          "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
        quantity: 1,
      },
      {
        name: "Hammer",
        image:
          "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
        quantity: 1,
      },
      {
        name: "Hammer",
        image:
          "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
        quantity: 1,
      },
    ],
    status: "returned",
    startDay: "2025-11-16T10:00:00.000Z",
    }
  ],
};

function AllHistory() {
  const [status, setStatus] = useState<Status | string>("");
  const email = mock_from_api.email;
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
            <DatePicker></DatePicker>
          </div>
          <div className={styles.status_filter}>
            <DropDown></DropDown>
          </div>  
        </div>
      </div>
      <div className={styles.table_body}>
        {
          mock_from_api.transactions.map((transaction, index)=> {
            return (
              <HistoryCard  transaction={transaction as Transaction}  email={email} key={`${index}`}></HistoryCard>
            )
          })
        }
      </div>
    </div>
  );
}

export default AllHistory;
