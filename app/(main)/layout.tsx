"use client";

import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.mainLayout}>
      <Navbar></Navbar>
      <div>{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
