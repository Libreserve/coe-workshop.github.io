"use client";

import React, { useState, useMemo } from "react";
import ModalContainer from "@/app/components/ModalContainer/modalContainer";
import { TransactionInfo } from "@/app/admin/components/modal/transactionInfo/transactionInfo";
import styles from "./timeTransaction.module.scss";
import { useGetAllTransactionsByStatusQuery } from "@/app/lib/features/admin/transactionsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorResponse {
  error?: string;
}

export const TimeTransaction = ({ toolId = 0 }) => {
  const [timeAxis] = useState<string[]>([
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
  ]);
  const firstColumnTime = "2025-01-10T09:00:00";
  const lastColumnTime = "2025-01-10T16:00:00";
  const [opened, setOpened] = useState<number[]>([]);

  const getColspanLenght = (startedAt: string, endedAt: string): number => {
    const t1 = new Date(startedAt);
    const t2 = new Date(endedAt);
    const timeDiff = t2.getTime() - t1.getTime();
    return Math.ceil(timeDiff / (1000 * 60) / 30);
  };

  const toggleOpened = (idx: number) => {
    setOpened((prev) =>
      prev.includes(idx) ? prev.filter((item) => item != idx) : [...prev, idx],
    );
  };

  const getTimeFormat = (date: string): string => {
    const time = new Date(date)
      .toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(":", ".");
    return time;
  };

  const {
    data: toolTransaction,
    isError,
    error,
  } = useGetAllTransactionsByStatusQuery({status: "RESERVE"});

  let toolTransactionErrorMessage =
    "There's some error occuring while try to fetching the transaction data";
  if (error && "data" in error) {
    const err = error as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      toolTransactionErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }

  const assetGroups = useMemo(() => {
    if (!toolTransaction) return [];
    
    const assetMap = new Map<string, any[]>();
    
    toolTransaction.users.forEach((userGroup: any) => {
      const user = userGroup.user;
      userGroup.adminTransactions?.forEach((tx: any, index: number) => {
        if (!assetMap.has(tx.assetID)) {
          assetMap.set(tx.assetID, []);
        }
        assetMap.get(tx.assetID)!.push({
          ...tx,
          user,
          uniqueId: `${tx.assetID}-${tx.id}-${index}`,
        });
      });
    });

    return Array.from(assetMap.entries()).map(([assetID, transactions]) => ({
      assetID,
      transactions: transactions.sort((a: any, b: any) => 
        new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
      ),
    }));
  }, [toolTransaction]);

  return isError ? (
    <div className={styles.error}>
      <span>error:</span> {toolTransactionErrorMessage};
    </div>
  ) : (
    <div className={styles.calendarWrapper}>
      <section className={styles.header}>
        <h3 className={styles.header_blank}></h3>
        {timeAxis.map((time, index) => (
          <React.Fragment key={index}>
            <h2 className={styles.header_time}>{time}</h2>
            <h3 className={styles.header_time}></h3>
          </React.Fragment>
        ))}
      </section>
      <section className={styles.table}>
        <div className={styles.grid_overlay}>
          {Array.from({ length: timeAxis.length * 2 + 1 }).map((_, index) => (
            <div key={index} className={styles.grid_line} />
          ))}
        </div>
        <div className={styles.tableContent}>
          {assetGroups.map((item, index) => {
            return (
              <div key={index} className={styles.row_container}>
                <div className={styles.row}>
                  <h3 className={styles.assetID}>{item.assetID}</h3>
                  {(() => {
                    if (firstColumnTime < item.transactions[0]?.startedAt) {
                      const firstGapColspan = getColspanLenght(
                        firstColumnTime,
                        item.transactions[0].startedAt,
                      );
                      return (
                        <div
                          className={styles.first}
                          style={
                            {
                              "--grid-colspan": `span ${firstGapColspan}`,
                            } as React.CSSProperties
                          }
                        ></div>
                      );
                    }
                  })()}
                  {item.transactions.map((event: any, id: number) => {
                    const cuerrentColSpan = getColspanLenght(
                      event?.startedAt,
                      event.endedAt,
                    );
                    const gapColSpan = getColspanLenght(
                      event.endedAt,
                      item.transactions[id + 1]?.startedAt ?? lastColumnTime,
                    );
                    return (
                      <React.Fragment key={event.uniqueId}>
                        <ModalContainer
                          opened={opened.includes(id)}
                          onClose={() => toggleOpened(id)}
                        >
                          <TransactionInfo
                            onClose={() => toggleOpened(id)}
                            user={event.user}
                            startedAt={event.startedAt}
                            endTime={event.endedAt}
                            message={event.message}
                            status={event.status}
                          ></TransactionInfo>
                        </ModalContainer>
                        <div
                          onClick={() => toggleOpened(id)}
                          className={styles.event}
                          style={
                            {
                              "--grid-colspan": `span ${cuerrentColSpan}`,
                            } as React.CSSProperties
                          }
                        >
                          <div className={styles.event_content}>
                            <div className={styles.event_line}></div>
                            <div>
                              <div>
                                <h3>{event.user.userName}</h3>
                              </div>
                              <p>
                                {getTimeFormat(event.startedAt)} -
                                {getTimeFormat(event.endedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                        {gapColSpan != 0 && (
                          <div
                            className={styles.gap}
                            style={
                              {
                                "--grid-colspan": `span ${gapColSpan}`,
                              } as React.CSSProperties
                            }
                          ></div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
