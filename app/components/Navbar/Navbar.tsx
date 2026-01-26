"use client";

import useDisclosure from "@/app/hook/useDisclosure";
import IconSvgMono from "@/app/components/Icon/SvgIcon";
import Image from "next/image";
import Link from "next/link";
import ModalContainer from "../ModalContainer/modalContainer";
import styles from "./Navbar.module.scss";
import NavSlide from "./navslide";
import { MenuMapProps } from "./type";
import { useAuth } from "@/app/Context/AuthContext/AuthContext";
import { getLoginUrl } from "@/app/lib/api";

function Navbar() {
  const { opened, handle } = useDisclosure();
  const menuMapProps: MenuMapProps[] = [
    { title: "Tools", path: "/tools" },
    { title: "About", path: "/about" },
    { title: "Report", path: "/path" },
  ];

  const { user, authenticated, logout } = useAuth();

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
        <Link href={"/"} className={styles.logo}>
          <h1 className={styles.logo_mark}>EN</h1>
          <h1 className={styles.logo_dot}>.W</h1>
        </Link>
        <div className={styles.link}>
          {menuMapProps.map((item, index) => (
            <Link key={index} href={item.path}>
              <h2>{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.action}>
        <IconSvgMono
          // svg={searchSvg}
          className={`${styles.action_search} ${styles.icon_color}`}
          width={100}
          height={100}
          alt="search_icon"
          src={"./search.svg"}
          ></IconSvgMono>
        <IconSvgMono
          // svg={basketSvg}
          className={`${styles.action_basket} ${styles.icon_color}`}
          width={120}
          height={120}
          alt="basket_icon"
          src={"./basket.svg"}
        ></IconSvgMono>
        <Image
          onClick={() => handle.open()}
          className={`${styles.action_hamberger}`}
          width={120}
          height={120}
          alt="hamberger_icon"
          src={"hamberger.svg"}
        ></Image>
        {authenticated && user ? (
          <div className={styles.action_button} onClick={handleLogoutClick}>
            ออกจากระบบ
          </div>
        ) : (
          <div className={styles.action_button} onClick={handleLoginClick}>
            เริ่มใช้งาน
          </div>
        )}
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
