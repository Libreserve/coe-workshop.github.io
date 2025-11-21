<<<<<<< HEAD
'use client'
import React from "react";
import {useState} from 'react';
import styles from "./Navbar.module.scss";
=======
"use client";

>>>>>>> origin/main
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import useDisclosure from "@/app/hook/useDisclosure";
import ModalContainer from "../Modal/modal";
import { useEffect } from "react";

function Navbar() {
<<<<<<< HEAD
  const [sidenavOpen, setSidenavOpen] = useState(false)
  
=======
  const { opened, handle } = useDisclosure();
  const clickHere = () => {
    handle.open;
    console.log("first");
  };
  useEffect(() => {
    console.log("opened", opened);
  }, [opened, clickHere]);

>>>>>>> origin/main
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
<<<<<<< HEAD
        <Link href={"/cart"}>
          <Image
            width={100}
            height={100}
            alt="search_icon"
            src={"/cart_icon.svg"}
            className={styles.cart_icon}
          >
          </Image>
        </Link>
        <div className={styles.sidenav_button}
          onClick={() => setSidenavOpen(!sidenavOpen)}
        >
          <Image
            width={100}
            height={100}
            alt="search_icon"
            src={"/hamburger.svg"}
            className={styles.hamburger}
          >
          </Image>
        </div>
        <div className={styles.action_button}>let's start</div>
      </div>

        {/* hidden side bar */}
        <div className={styles.sidenav}  style={{right:`${sidenavOpen ?  '0' : '-100%'}`}}>
            <div className={styles.sidenav_closed_button}>
              <Image
                width={16.4}
                height={16.4}
                alt="search_icon"
                src={"/cross.svg"}
                className={styles.sidenav_cross}
                onClick={() => setSidenavOpen(!sidenavOpen)}
              ></Image>
            </div>
            <div className={styles.sidenav_link}>
              <Link href="/tools">
                <p>Tools</p>
              </Link>
              <p>About</p>
              <p>Report</p>
          </div>
          <div className={styles.sidenav_action_button}>Let's Start</div>
        </div>
        { sidenavOpen ? (
          <div className={styles.sidenav_overlay} onClick={() => setSidenavOpen(!sidenavOpen)}></div>
        ) : (
          <></>
        )}         
=======
        <Image
          className={styles.action_basket}
          width={120}
          height={120}
          alt="basket_icon"
          src={"./basket.svg"}
        ></Image>
        <Image
          onClick={() => handle.open()}
          className={styles.action_hamberger}
          width={120}
          height={120}
          alt="hamberger_icon"
          src={"hamberger.svg"}
        ></Image>
        <div className={styles.action_button}>let's start</div>
      </div>
      <ModalContainer opened={opened} onClose={handle.close}>
        <div></div>
      </ModalContainer>
>>>>>>> origin/main
    </div>
  );
}

export default Navbar;
