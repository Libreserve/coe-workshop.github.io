"use client";

import { SearchBar } from "@/app/components/Form/SearchBar/SearchBar";
import { useState } from "react";
import styles from "./landing.module.scss";

function Landing() {
  const [content, setContent] = useState("");
  return (
    <div className={styles.landing}>
      <div className={styles.landing_body}>
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
