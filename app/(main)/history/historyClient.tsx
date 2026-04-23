"use client";

import Loader from "@/app/admin/components/layout/loader/loader";
import { StatusTag } from "@/app/admin/components/ui/statusTag/statusTag";
import { AdminStatus } from "@/app/types/api/transaction";
import styles from "./history.module.scss";
import { useState } from "react";
import { useGetUserTransactionHistoryQuery } from "@/app/lib/features/admin/transactionsApi";
import { useGetMeQuery } from "@/app/lib/features/admin/authApi";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";

const formatHourMinute = (iso: string): string => {
  return new Date(iso).toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDateThai = (iso: string): string => {
  return new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const History = () => {
  const [openGroups, setOpenGroups] = useState<number[]>([]);
  const { data: user } = useGetMeQuery();
  const userId = user?.id || "";
  const pageQuery = 1;

  const { data, isLoading, isError } = useGetUserTransactionHistoryQuery(
    { userId, page: pageQuery },
    { skip: !userId }
  );

  const toggleGroup = (idx: number) => {
    setOpenGroups((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>ประวัติการจองของฉัน</h2>
      </div>

      {!userId ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateContent}>
            <h3 className={styles.emptyStateTitle}>กรุณาเข้าสู่ระบบ</h3>
            <p className={styles.emptyStateDescription}>คุณต้องเข้าสู่ระบบเพื่อดูประวัติการจอง</p>
          </div>
        </div>
      ) : isLoading ? (
        <div className={styles.loadingContainer}>
          <Loader />
          <p className={styles.loadingText}>กำลังโหลดข้อมูล...</p>
        </div>
      ) : isError ? (
        <div className={styles.error}>เกิดข้อผิดพลาดในการดึงข้อมูล</div>
      ) : !data ? (
        <div className={styles.empty}>ไม่พบข้อมูล</div>
      ) : (
        <>
          <div className={styles.userInfo}>
            <div className={styles.userInfoItem}>
              <span className={styles.label}>ชื่อผู้ใช้:</span>{" "}
              <span className={styles.value}>{data.user.userName}</span>
            </div>
            <div className={styles.userInfoItem}>
              <span className={styles.label}>เบอร์โทร:</span>{" "}
              <span className={styles.value}>{data.user.phone}</span>
            </div>
            {data.user.faculty && (
              <div className={styles.userInfoItem}>
                <span className={styles.label}>คณะ:</span>{" "}
                <span className={styles.value}>{data.user.faculty}</span>
              </div>
            )}
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col className={styles.itemName} />
                <col className={styles.assetID} />
                <col className={styles.status} />
                <col className={styles.time} />
                <col className={styles.message} />
              </colgroup>

              <thead>
                <tr>
                  <th>ชื่ออุปกรณ์</th>
                  <th>เลขครุภัณฑ์</th>
                  <th>สถานะ</th>
                  <th>เวลา</th>
                  <th>คำร้อง</th>
                </tr>
              </thead>

              <tbody>
                {data.transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.emptyCell}>
                      ไม่มีประวัติการจอง
                    </td>
                  </tr>
                ) : (
                  data.transactions.map((dayGroup, dayIndex) => (
                    <>
                      <tr
                        key={`day-${dayIndex}`}
                        className={styles.dayRow}
                        onClick={() => toggleGroup(dayIndex)}
                      >
                        <td colSpan={5}>
                          <div className={styles.dayHeader}>
                            <div
                              className={`${styles.dayArrow} ${
                                openGroups.includes(dayIndex)
                                  ? styles.dayArrowOpen
                                  : styles.dayArrowClosed
                              }`}
                            >
                              <SvgIconMono
                                src={`/icon/arrow.svg`}
                                width={15}
                                height={15}
                                alt="arrowDown"
                              />
                            </div>
                            <h3 className={styles.dayDate}>
                              {formatDateThai(dayGroup.startTime)}
                            </h3>
                          </div>
                        </td>
                      </tr>

                      {openGroups.includes(dayIndex) &&
                        dayGroup.userTransactions.map((txn, txnIndex) => (
                          <tr
                            key={`txn-${dayIndex}-${txnIndex}`}
                            className={styles.transactionRow}
                          >
                            <td className={styles.itemNameText}>
                              {txn.itemName}
                            </td>
                            <td className={styles.assetText}>{txn.assetID}</td>
                            <td className={styles.statusTagCell}>
                              <StatusTag
                                status={txn.status as AdminStatus}
                              />
                            </td>
                            <td className={styles.time}>
                              <div className={styles.timeRange}>
                                <span>{formatHourMinute(txn.startedAt)}</span>
                                <span className={styles.timeDash}>-</span>
                                <span>{formatHourMinute(txn.endedAt)}</span>
                              </div>
                            </td>
                            <td className={styles.message}>
                              {txn.message ?? "-"}
                            </td>
                          </tr>
                        ))}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
