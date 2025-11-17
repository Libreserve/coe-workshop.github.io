"use client";
import {useState } from "react";
import styles from "./DropDown.module.scss";
import Image from "next/image";
function DropDown({ value, onChange }: DropDown) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<Status | string>("");
  const states:Status[] = ["pending", "doing", "rejected", "returned"];
  const getStateInThai:Record<Status, string> = {
        pending: "รออนุมัติ",
        doing: "ระหว่างใช้",
        rejected: "ปฎิเสธ",
        returned: "คืนแล้ว",
    }
  return (
    <>
      <div className={styles.dropdown}>
        <button
          className={styles.link}
            onClick={() => {
            setActive(!active);
          }}
        >
          <div>{ getStateInThai[selected as Status] || "Pick Value"}</div>
          <Image src={"arrow2.svg"} alt={""} width={20} height={20} className={styles.link_image}></Image>
        </button>
        <div className={`${styles.dropdown_menu}${active ? "_active" : ""}`}>
          {states.map((state, index) => {
            return (
              <div
                key={`${index}-item`}
                className={`${styles.item}${state === value ? "_selected" : ""}`}
                onClick={() => {
                  setSelected(state);
                  onChange?.(state);
                  setActive(!active);
                }}
              >
                {getStateInThai[state as Status]}
              </div>
            );
          })}
        </div>
      </div>
      {
        active && (
          <div className={styles.undo_overlay} onClick={() => setActive(false)}>

          </div>
        )
      }
    </>
  );
}

export default DropDown;
