"use client";

import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { mockUserTableTransactions } from "@/app/mockdata/mockdata";
import React, { useState } from "react";
import { StatusTag } from "../StatusTag/StatusTag";
import styles from "./UserTrasaction.module.scss";
export const UserTransaction = () => {
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);

  const toggleOpenTransaction = (idx: number) => {
    setOpenTransaction((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const formatHourMinute = (iso: string): string => {
    return new Date(iso).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <colgroup>
          <col className={styles.itemName} />
          <col className={styles.assetID} />
          <col className={styles.status} />
          <col className={styles.endTime} />
          <col className={styles.message} />
        </colgroup>

        <thead>
          <tr>
            <th>ชื่ออุปกรณ์</th>
            <th>เลขครุภัณฑ์</th>
            <th>สถานะ</th>
            <th>เวลาสิ้นสุด</th>
            <th>คำร้อง</th>
          </tr>
        </thead>

        <tbody>
          {mockUserTableTransactions.map((item, index) => (
            <React.Fragment key={index}>
              <tr className={styles.userRow}>
                <td colSpan={5}>
                  <div className={styles.userInfo}>
                    <div style={{
                        transform: openTransaction.includes(index)
                          ? ""
                          : "rotate(-90deg)",
                      }}
                      onClick={() => toggleOpenTransaction(index)}>
                        <SvgIconMono
                        src={`/icon/arrow.svg`}
                        width={15}
                        height={15}
                        alt="arrowDown"
                      ></SvgIconMono>
                    </div>
                    <h2 className={styles.username}>{item.startTime}</h2>
                  </div>
                </td>
              </tr>

              {item.userTransaction.map(
                (t) =>
                  openTransaction.includes(index) && (
                    <tr key={t.assetId} className={styles.transactionRow}>
                      <td>{t.itemName}</td>
                      <td>{t.assetId}</td>
                      <td>
                        <StatusTag status={t.status} />
                      </td>
                      <td className={styles.endTime}>
                        {formatHourMinute(t.endTime)}
                      </td>
                      <td className={styles.message}>{t.message}</td>
                    </tr>
                  )
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
