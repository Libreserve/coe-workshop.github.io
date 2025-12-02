import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { navSlideProps } from "./type";
const NavSlide = ({ menuMapPropsList, onClose }: navSlideProps) => {
  return (
    <div className={styles.navSlide}>
      <div className={styles.navSlide_imageContainer}>
        <Image
          onClick={() => onClose()}
          src={"./close.svg"}
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
        <p className={styles.navSlide_auth}>Let&apos;s Start</p>
      </div>
    </div>
  );
};

export default NavSlide;
