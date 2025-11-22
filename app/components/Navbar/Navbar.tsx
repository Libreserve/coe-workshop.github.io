"use client";

import useDisclosure from "@/app/hook/useDisclosure";
import Image from "next/image";
import Link from "next/link";
import ModalContainer from "../ModalContainer/modalContainer";
import styles from "./Navbar.module.scss";
import { MenuMapProps } from "./type";
import NavSlide from "./navslide";
function Navbar() {
  const { opened, handle } = useDisclosure();
  const menuMapProps: MenuMapProps[] = [
    { title: "Tools", path: "/tools" },
    { title: "About", path: "/about" },
    { title: "Report", path: "/path" },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_inner}>
        <div className={styles.logo}>
          <p className={styles.logo_mark}>EN</p>
          <p className={styles.logo_dot}>.W</p>
        </div>
        <div className={styles.link}>
          {menuMapProps.map((item, index) => (
            <Link key={index} href={item.path}>
              <p>{item.title}</p>
            </Link>
          ))}
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
        <NavSlide
          menuMapPropsList={menuMapProps}
          onClose={handle.close}
        ></NavSlide>
      </ModalContainer>
    </div>
  );
}

export default Navbar;
