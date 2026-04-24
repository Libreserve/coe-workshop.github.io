"use client";
import Link from "next/link";
import { useState } from "react";
import useDisclosure from "@/app/hook/useDisclosure";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import Image from "next/image";
import ModalContainer from "../ModalContainer/modalContainer";
import styles from "./Navbar.module.scss";
import NavSlide from "./navslide";
import { MenuMapProps } from "./type";
import { useAuth } from "@/app/Context/AuthContext/AuthContext";
import { getLoginUrl } from "@/app/lib/api";

function Navbar() {
  const { opened, handle } = useDisclosure();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuMapProps: MenuMapProps[] = [
    { title: "Tools", path: "/tools" },
    // { title: "About", path: "/about" },
    { title: "Report", path: "/report-issue" },
  ];

  const { user, logout } = useAuth();

  const handleLoginClick = () => {
    window.location.href = getLoginUrl();
  };

  const handleLogoutClick = async () => {
    await logout();
    window.location.reload();
  };

  const userName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.email || "User";

  const userInitial = user?.firstName?.[0] || user?.email?.[0] || "U";

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_inner}>
        <Link href={"/landing"} className={styles.logo}>
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
        <Link href={"/history"}>
          <SvgIconMono
            className={`${styles.action_basket} ${styles.icon_color}`}
            width={120}
            height={120}
            alt="basket_icon"
            src={"./icon/history.svg"}
          ></SvgIconMono>
        </Link>
        <Image
          onClick={() => handle.open()}
          className={`${styles.action_hamberger}`}
          width={120}
          height={120}
          alt="hamberger_icon"
          src={"hamberger.svg"}
        ></Image>
        {user ? (
          <div className={styles.userProfile}>
            <button
              className={styles.userProfileButton}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div
                className={styles.userAvatar}
                style={user?.photo ? { backgroundImage: `url(${user.photo})` } : undefined}
              >
                {!user?.photo && <span className={styles.userInitial}>{userInitial}</span>}
              </div>
              <span className={styles.userName}>{userName}</span>
              <SvgIconMono
                src="/icon/arrow.svg"
                width={12}
                height={12}
                className={`${styles.userMenuArrow} ${userMenuOpen ? styles.userMenuArrowOpen : ""}`}
              />
            </button>
            {userMenuOpen && (
              <div className={styles.userMenu}>
                <div className={styles.userMenuItem} onClick={handleLogoutClick}>
                  <SvgIconMono src="/admin/icon/sign-out.svg" width={16} height={16} />
                  <span>ออกจากระบบ</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            className={styles.action_button}
            onClick={handleLoginClick}
          >
            เริ่มใช้งาน
          </button>
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
