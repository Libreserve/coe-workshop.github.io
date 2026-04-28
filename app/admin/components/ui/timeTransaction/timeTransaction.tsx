"use client";

import React, { useState } from "react";
import ModalContainer from "@/app/components/ModalContainer/modalContainer";
import { TransactionInfo } from "@/app/admin/components/modal/transactionInfo/transactionInfo";
import styles from "./timeTransaction.module.scss";
import { useGetReservedByItemQuery } from "@/app/lib/features/admin/transactionsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Loader from "../../layout/loader/loader";
import Image from "next/image";
import { isAdminRoute } from "@/app/utils/isAdminRoute";

interface ErrorResponse {
  error?: string;
}

const OFFICE_START_MINUTES = 540; // 09:00
const SLOT_MINUTES = 30;

const toThaiMinutes = (isoString: string): number => {
  const d = new Date(isoString);
  return (d.getUTCHours() + 7) * 60 + d.getUTCMinutes();
};

const getSlotCount = (startIso: string, endIso: string): number => {
  const startMin = toThaiMinutes(startIso);
  const endMin = toThaiMinutes(endIso);
  return Math.round((endMin - startMin) / SLOT_MINUTES);
};

const minutesToSlotIndex = (isoString: string): number => {
  const thaiMin = toThaiMinutes(isoString);
  return Math.floor((thaiMin - OFFICE_START_MINUTES) / SLOT_MINUTES);
};

export const TimeTransaction = ({ toolId = 0, date }: { toolId?: number; date?: string }) => {
  const todayDateString = new Date().toISOString().split("T")[0];
  const effectiveDate = date || todayDateString;
  const OFFICE_END_ISO = `${effectiveDate}T16:00:00+07:00`;

  const [timeAxis] = useState<string[]>([
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
  ]);
  const [opened, setOpened] = useState<string[]>([]);

  const toggleOpened = (id: string) => {
    setOpened((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const getTimeFormat = (date: string): string => {
    const time = new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(new Date(date)).replace(":", ".");
    return time;
  };

  const {
    data,
    isError,
    error,
    isLoading,
  } = useGetReservedByItemQuery({ itemId: toolId, date: effectiveDate });

  let toolTransactionErrorMessage =
    "There's some error occuring while try to fetching the transaction data";
  if (error && "data" in error) {
    const err = error as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      toolTransactionErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }

  if (isLoading) {
    return <>
             <div className={styles.loadingContainer}>
               <Loader></Loader>
     	       <p className={styles.loadingText}>กำลังโหลดข้อมูล...</p>
             </div>
	  </>
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <span>error:</span> {toolTransactionErrorMessage};
      </div>
    );
  }

  const itemData = Array.isArray(data) ? data[0] : data;

  const assetsToItems = itemData?.assetsToItems ?? [];
  const assets = assetsToItems.map((item: any) => {
    const rawTransactions = item.asset?.transactions ?? [];
    const sortedTransactions = [...rawTransactions].sort((a, b) => {
        return new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime();
    });

    return {
      id: item.assetID,
      assetNumber: item.asset?.assetID,
      transactions: sortedTransactions,
    }});

  if (assets.length === 0) 
    return <>
	     <div className={styles.loadingContainer}>
	       <Image
                 src={"/transaction/empty-rafiki.svg"}
                 alt={""}
                 width={300}
                 height={300}
	         className={styles.empty}
               />
	       <p className={styles.loadingText}>ไม่มีครุภัณฑ์{isAdminRoute() && "คลิกที่ปุ่ม 3 จุดข้างชื่อเครื่องมือเพื่อสร้างครุภัณฑ์"}</p>
	     </div>
	   </>

  return (
    <div>
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
            {assets.map((asset: any) => {
              const transactions = asset.transactions ?? [];
              const hasTransactions = transactions.length > 0;
              
              return (
                <div key={asset.assetNumber} className={styles.row_container}>
                  <div className={styles.row}>
                    <h3 className={styles.assetNumber}>{asset.assetNumber}</h3>
                    {!hasTransactions ? (
                      <div
                        className={styles.available}
                        style={{ "--grid-colspan": "span 14" } as React.CSSProperties}
                      >
                        <span className={styles.availableText}>ว่างทั้งวัน</span>
                      </div>
                    ) : (
                      <>
                        {(() => {
                          const firstStartSlot = minutesToSlotIndex(transactions[0]?.startedAt);
                          if (firstStartSlot > 0 && transactions[0]?.startedAt) {
                            return (
                              <div
                                className={styles.first}
                                style={
                                  {
                                    "--grid-colspan": `span ${firstStartSlot}`,
                                  } as React.CSSProperties
                                }
                              ></div>
                            );
                          }
                        })()}
                        {transactions.map((event: any, idx: number) => {
                          const currentColSpan = getSlotCount(event.startedAt, event.endedAt);
                          const nextStartIso = transactions[idx + 1]?.startedAt ?? OFFICE_END_ISO;
                          const gapColSpan = getSlotCount(event.endedAt, nextStartIso);
			  console.log(event);

                          return (
                            <React.Fragment key={event.id}>
                              <ModalContainer
                                opened={opened.includes(String(event.id))}
                                onClose={() => toggleOpened(String(event.id))}
                              >
                                <TransactionInfo
                                  onClose={() => toggleOpened(String(event.id))}
                                  user={event.reserver}
                                  startedAt={event.startedAt}
                                  endTime={event.endedAt}
                                  message={event.messages[0].detail}
                                  status={event.status}
                                ></TransactionInfo>
                              </ModalContainer>
                              <div
                                onClick={() => toggleOpened(String(event.id))}
                                className={styles.event}
                                style={
                                  {
                                    "--grid-colspan": `span ${currentColSpan}`,
                                  } as React.CSSProperties
                                }
                              >
                                <div className={styles.event_content}>
                                  <div className={styles.event_line}></div>
                                  <div>
                                    <div>
                                      <h3 className={styles.info}>{event.reserver?.userName}</h3>
                                    </div>
                                    <p className={styles.info}>
                                      {getTimeFormat(event.startedAt)} -
                                      {getTimeFormat(event.endedAt)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {gapColSpan > 0 && (
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
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
