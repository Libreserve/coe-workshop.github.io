"use client";

import React, { ReactNode } from "react";
import Navbar from "@/app/admin/components/layout/navbar/navbar";
import styles from "./main.module.scss";

const AdminMainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.children}>{children}</main>
    </div>
  );
};

export default AdminMainLayout;
