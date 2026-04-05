"use client";
import { User } from "../../types/api/user";
import styles from "./ProfileInfo.module.scss";
import Image from "next/image";
import { useState } from "react";
// mock interface
interface USER {
  profileUrl: string;
  name: string;
  faculty: string;
  identification: string;
  status: string; //some enum shit
}

interface TRANSACTION {
  transactionId: string;
  itemName: string;
  assetName: string;
  startDate: string;
  endDate: string;
  status: string;
}

type TRANSACTIONS = TRANSACTION[];
// mock data
const user: USER = {
  // profileUrl: "github.svg",
  profileUrl:
    "https://i.scdn.co/image/ab67616d0000b2735007f31b6e5596032908db46",
  name: "Phuph Amhathon",
  faculty: "Engineering",
  identification: "phupha.a@kkumail.com",
  status: "trauma",
};

const mockData: TRANSACTIONS = [
  {
    transactionId: "TX-2824-8812",
    itemName: "4D Printer",
    assetName: "Leica RTC360 Laser Scanner",
    startDate: "2026-10-12",
    endDate: "2026-10-18",
    status: "RETURNED",
  },
  {
    transactionId: "TX-2824-9184",
    itemName: "4D Printer",
    assetName: "DJI Matrice 300 RTK",
    startDate: "2026-10-24",
    endDate: "2026-10-26",
    status: "ACTIVE",
  },
  {
    transactionId: "TX-2824-9556",
    itemName: "4D Printer",
    assetName: "Fluke Ti480 PRO Thermal",
    startDate: "2026-11-02",
    endDate: "2026-11-05",
    status: "SCHEDULED",
  },
  {
    transactionId: "TX-2824-9184",
    itemName: "4D Printer",
    assetName: "DJI Matrice 300 RTK",
    startDate: "2026-10-24",
    endDate: "2026-10-26",
    status: "ACTIVE",
  },
  {
    transactionId: "TX-2824-9556",
    itemName: "4D Printer",
    assetName: "Fluke Ti480 PRO Thermal",
    startDate: "2026-11-02",
    endDate: "2026-11-05",
    status: "SCHEDULED",
  },
];

const formatTimeRange = (start: string, end: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  // Converts "2026-10-12" to "Oct 12"
  const formattedStart = new Date(start).toLocaleDateString("en-US", options);
  const formattedEnd = new Date(end).toLocaleDateString("en-US", options);

  return `${formattedStart} — ${formattedEnd}`;
};

const ProfileInfo = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const offset = 5;
  return (
    <div className={styles.container}>
      <main className={styles.profile}>
        <div className={styles.profile_url}>
          <div className={styles.imageContainer}>
            <Image
              src={user.profileUrl}
              height={150}
              width={150}
              alt="user_profile"
              className={styles.image}
            />

            <div className={styles.editBadge}>
              <button className={styles.editIcon}>⚙️</button>
            </div>
          </div>
        </div>
        <div className={styles.profile_name}>
          <h1>{user.name}</h1>
        </div>
        <div className={styles.profile_faculty}>
          <h3>FACULTY / COLLEGE</h3>
          <span>{user.faculty}</span>
        </div>
        <div className={styles.profile_identification}>
          <h3>IDENTIFICATION</h3>
          <span>{user.identification}</span>
        </div>
        <div className={styles.profile_status}>
          <h3>STATUS</h3>
          <span>● {user.status}</span>
        </div>
        <div className={styles.profile_edit}>
          <button className={styles.button}>
            EDIT EDIT PROFILE DETAILS
          </button>
        </div>
      </main>

      <main className={styles.activity}>
        <div className={styles.header}>
          <div className={styles.title}>
            <p>ACTIVITY RECORDS</p>
            <h1>Transaction</h1>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tableScrollWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>รหัสรายการ</th>
                  <th>เลขครุภัณฑ์</th>
                  <th>ระยะเวลาการยืม</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((transaction) => (
                  <tr
                    key={transaction.transactionId}
                    className={styles.transaction}
                  >
                    <td>{transaction.transactionId}</td>
                    <td>
                      <div className={styles.itemName}>
                        {transaction.itemName}
                      </div>
                      <div>{transaction.assetName}</div>
                    </td>
                    <td>
                      {formatTimeRange(
                        transaction.startDate,
                        transaction.endDate,
                      )}
                    </td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}

                {/* If there are less than 5 rows, this empty row renders and absorbs the extra space */}
                {mockData.length < 5 && (
                  <tr className={styles.fillerRow}>
                    <td colSpan={4}></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.footer}>
            <div className={styles.footerInfo}>
              SHOWING {mockData.length} OF 127 TRANSACTIONS
            </div>
            <div className={styles.footerControls}>
              <button className={styles.pageBtnPrev}>❮ PREVIOUS</button>
              <button className={styles.pageBtnNext}>NEXT ❯</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileInfo;
