"use client";

import Image from "next/image";
import styles from "./toolitem.module.scss";
import { useState } from "react";
const Toolitem = () => {
  const [itemName] = useState<string>("Occaecat");
  const [category] = useState<string>("กระมงปรือ");
  const [description] = useState<string>(`
    Lorem ipsum dolor sit amet,
    consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud 
    `);

  return (
    <div className={styles.toolitem}>
      <section className={styles.info}>
        <div className={styles.info_cover}></div>
        <div className={styles.info_title}>
          <h1 className={styles.info_itemname}>{itemName}</h1>
          <h4 className={styles.info_category}>{category}</h4>
        </div>
        <p>{description}</p>
      </section>
      <section className={styles.action}>
        <div className={styles.action_title}>
          <h2>ตารางการจอง</h2>
          <button type="button" className={styles.action_reserve}>
            จองอุปกรณ์นี้
          </button>
        </div>
      </section>
    </div>
  );
};

export default Toolitem;
