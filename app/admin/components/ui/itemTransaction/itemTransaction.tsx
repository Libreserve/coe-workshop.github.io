"use client";

import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { useState } from "react";
import { StatusTag } from "../statusTag/statusTag";
import styles from "./tableTransaction.module.scss";
import { useGetAllTransactionsByStatusQuery } from "@/app/lib/features/admin/transactionsApi";
import Loader from "@/app/admin/components/layout/loader/loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorResponse } from "@/app/types/api/transaction";

enum TransactionsStatus {
  REJECT = "REJECT",
  RESERVE = "RESERVE",
  APPROVE = "APPROVE",
  PENDING = "PENDING",
  Blank = "Blank",
}

export const ItemTransaction = ({ toolId = 0 }) => {
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);
  const [closeTransaction, setCloseTransaction] = useState<number[]>([]);
  
  const toggleTransaction = (idx: number) => {
    if (openTransaction.includes(idx)) {
      setCloseTransaction((prev) => [...prev, idx]);
      setTimeout(() => {
        setOpenTransaction((prev) => prev.filter((item) => item !== idx));
        setCloseTransaction((prev) => prev.filter((item) => item !== idx));
      }, 300);
    } else {
      setOpenTransaction((prev) => [...prev, idx]);
    }
  };

  const {
    data: toolTransaction,
    isError,
    error,
    isLoading,
  } = useGetAllTransactionsByStatusQuery({status: "RESERVE"});
  
  let toolTransactionErrorMessage = "There's some error occuring while try to fetching the transaction data";
  if (error && "data" in error) {
    const err = error as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      toolTransactionErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }
  
  return (
    <div className={styles.item_transaction}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th className={styles.toggle}></th>
            <th className="">เลขครุภัณฑ์</th>
            <th>ผู้ยืม</th>
            <th className={styles.header_status}>สถานะ</th>
            <th>เวลาสิ้นสุด </th>
            <th className={styles.header_message}>คำร้อง</th>
            <th className={styles.header_action}></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7}>
                <div className={styles.loading}>
                  <Loader></Loader>
                </div>
              </td>
            </tr>
          )}
          {toolTransaction?.users?.map((userGroup: any, userIndex: number) =>
            userGroup.adminTransactions?.map((transaction: any, txIndex: number) =>
              txIndex === 0 ? (
                <tr className={styles.firstItem} key={`${userIndex}-${txIndex}`}>
                  <td
                    className={styles.toggle}
                    onClick={() => toggleTransaction(userIndex)}
                  >
                    <div
                      style={{
                        transform: openTransaction.includes(userIndex)
                          ? ""
                          : "rotate(-90deg)",
                      }}
                    >
                      <SvgIconMono
                        className={styles.toggle_image}
                        src={`/icon/arrow.svg`}
                        alt="arrow"
                        width={15}
                        height={15}
                      ></SvgIconMono>
                    </div>
                  </td>
                  <td className={styles.assetID}>{transaction.assetID}</td>
                  <td className={styles.username}>{userGroup.user?.userName}</td>
                  <td className={styles.status}>
                    <StatusTag status={transaction.status}></StatusTag>
                  </td>
                  <td className={styles.endedAt}>{transaction.endedAt}</td>
                  <td className={styles.message}>{transaction.message ?? "no message attach"}</td>
                  <td className={styles.trashSpace}>
                    {transaction.status === TransactionsStatus.Blank && (
                      <SvgIconMono
                        className={styles.tashIcon}
                        src={`/icon/tash.svg`}
                        width={20}
                        height={20}
                        alt="tash"
                      ></SvgIconMono>
                    )}
                  </td>
                </tr>
              ) : (
                openTransaction.includes(userIndex) && (
                  <tr
                    className={`${styles.oldTransaction} ${
                      closeTransaction.includes(userIndex)
                        ? styles.slideOut
                        : styles.slideIn
                    }`}
                    key={`${userIndex}-${txIndex}`}
                  >
                    <td></td>
                    <td className={styles.assetID}>{transaction.assetID}</td>
                    <td className={styles.username}>{userGroup.user?.userName}</td>
                    <td className={styles.status}>
                      <StatusTag status={transaction.status}></StatusTag>
                    </td>
                    <td className={styles.endedAt}>{transaction.endedAt}</td>
                    <td className={styles.message}>{transaction.message ?? "no message attach"}</td>
                    <td></td>
                  </tr>
                )
              ),
            ),
          )}
          {isError && (
            <tr>
              <td colSpan={7}>
                <div className={styles.error}>
                  error: {toolTransactionErrorMessage}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
