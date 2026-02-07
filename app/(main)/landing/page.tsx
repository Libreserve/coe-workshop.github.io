"use client";

import { SearchBar } from "@/app/components/Form/SearchBar/SearchBar";
import { useState } from "react";
import styles from "./landing.module.scss";
import { TypeEffect } from "@/app/components/UI/TypeEffect/TypeEffect";
function Landing() {
  const [content, setContent] = useState("");
  const [typeOptions, setTypeOptions] = useState([
    "Print 3D",
    "ออกแบบชิ้นส่วน",
    "Microcontroller",
  ]);
  return (
    <div className={styles.landing}>
      <div className={styles.landing_body}>
        <div className={styles.header}>
          <h2 className={styles.header_text}>ค้นหาอุปกรณ์สำหรับ</h2>
          <TypeEffect options={typeOptions}></TypeEffect>
        </div>
        <div className={styles.searchBar}>
          <SearchBar placeholder="เว็บแต่งกี่เพ่าหน่อย สาวหมวยของเค้า"></SearchBar>
        </div>
      </div>
      {/* <WelcomeText></WelcomeText>
      <Category></Category>
      <Guide></Guide>
      <Discover></Discover> */}
      {/* <Popular></Popular>
      <Interpreting></Interpreting> */}
      {/* <Accordion></Accordion> */}
    </div>
  );
}
export default Landing;
