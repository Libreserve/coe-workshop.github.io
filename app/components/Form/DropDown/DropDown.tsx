"use client";
import { useState } from "react";
import styles from "./DropDown.module.scss";
import Image from "next/image";
import { TransactionStatus } from "./DropDown.type";
import type { DropDownProps } from "./DropDown.type";
const DropDown = ({ value, onChange }: DropDownProps) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<TransactionStatus | undefined>();
  const status: TransactionStatus[] = [
    TransactionStatus.PENDING,
    TransactionStatus.DOING,
    TransactionStatus.REJECTED,
    TransactionStatus.RETURNED,
  ];
  const getTransactionStatusTH: Record<TransactionStatus, string> = {
    [TransactionStatus.PENDING]: "รออนุมัติ",
    [TransactionStatus.DOING]: "ระหว่างใช้",
    [TransactionStatus.REJECTED]: "ปฏิเสธ",
    [TransactionStatus.RETURNED]: "คืนแล้ว",
  };
  const handleOnClick = (status: TransactionStatus | undefined) => {
    if (status === selected) status = undefined;
    setSelected(status);
    onChange?.(status);
    setActive(!active);
  };

  return (
    <>
      <div className={styles.dropdown}>
        <button
          className={styles.link}
          onClick={() => {
            setActive(!active);
          }}
        >
          <div>
            {selected ? getTransactionStatusTH[selected] : "Pick Value"}
          </div>
          <Image
            src={"arrow2.svg"}
            alt={""}
            width={20}
            height={20}
            className={styles.link_image}
          ></Image>
        </button>
        <div className={`${styles.dropdown_menu}${active ? "_active" : ""}`}>
          {status.map((status, index) => {
            return (
              <div
                key={`${index}-item`}
                className={`${styles.item}${status === value ? "_selected" : ""}`}
                onClick={() => {
                  handleOnClick(status);
                }}
              >
                <div>{getTransactionStatusTH[status]}</div>
              </div>
            );
          })}
        </div>
      </div>
      {active && (
        <div
          className={styles.undo_overlay}
          onClick={() => setActive(false)}
        ></div>
      )}
    </>
  );
};

export default DropDown;
