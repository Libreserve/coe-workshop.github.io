"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>Admin Dashboard</div>
      <div className={styles.links}>
        <Link href="/admin/transactions">Transactions</Link>
        <Link href="/admin/tools">Tools</Link>
        <Link href="/admin/test-item">Test Item</Link>
      </div>
    </nav>
  );
};

export default Navbar;
