'use client';
import React from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import {useAuth} from "@/app/Context/AuthContext/AuthContext";
import {getLoginUrl} from "@/app/lib/api";

function Navbar() {
    const { user, authenticated,  logout } = useAuth();

    const handleLoginClick = () => {
        window.location.href = getLoginUrl();
    };

    const handleLogoutClick = async () => {
        await logout();
        window.location.reload();
    };

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
          width={100}
          height={100}
          alt="search_icon"
          src={"/search.svg"}
        ></Image>
          { authenticated && user ? (
                  <div className={styles.action_button} onClick={handleLogoutClick}>
                      Logout
                  </div>
          ) : (
              <div className={styles.action_button} onClick={handleLoginClick}>
                  let's start
              </div>
          )}
      </div>
    </div>
  );
}


export default Navbar;
