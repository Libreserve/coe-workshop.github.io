import React from "react";
import styles from "./grid.module.scss";

function page() {
  return (
    <div className={styles.container}>
      <div className={styles.blog}></div>
      <div className={styles.blog}></div>
      <div className={styles.blog}></div>
      <div className={styles.blog}></div>
      <div className={styles.blog}></div>
    </div>
  );
}

export default page;
