import styles from "./navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { NavSlideProps } from "./types";

const NavSlide = ({ menuMapPropsList, onClose }: NavSlideProps) => {
  return (
    <aside className={styles.navSlide}>
      <div className={styles.navSlide_imageContainer}>
        <Image
          onClick={() => onClose()}
          src="/admin/navbar/close.svg"
          alt="close"
          width={20}
          height={20}
        ></Image>
      </div>
      <div className={styles.navSlide_menu}>
        {menuMapPropsList.map((item, index) => (
          <Link key={index} href={item.path}>
            <p className={styles.navSlide_title}>{item.title}</p>
          </Link>
        ))}
      </div>
      <div>
        <p className={styles.navSlide_auth}>ออกจากระบบ</p>
      </div>
    </aside>
  );
};

export default NavSlide;
