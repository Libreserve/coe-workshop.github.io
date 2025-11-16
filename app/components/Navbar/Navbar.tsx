import React from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_inner}>
        <div className={styles.logo}>
          <p className={styles.logo_mark}>EN</p>
          <p className={styles.logo_dot}>.W</p>
        </div>
        <div className={styles.link}>
          <Link href="/tools">
            <p>Tools</p>
          </Link>
          <p>About</p>
          <p>Report</p>
        </div>
      </div>
      <div className={styles.action}>
        <Image
          className={styles.action_search}
          width={100}
          height={100}
          alt="search_icon"
          src={"/search.svg"}
        ></Image>
        <Image
          className={styles.action_basket}
          width={120}
          height={120}
          alt="basket_icon"
          src={"./basket.svg"}
        ></Image>
        <div className={styles.action_button}>let's start</div>
      </div>
    </div>
  );
}

export default Navbar;
