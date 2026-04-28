import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { navSlideProps } from "./type";
import { getLoginUrl } from "@/app/lib/api";
import { useAuth } from "@/app/Context/AuthContext/AuthContext";

const NavSlide = ({ menuMapPropsList, onClose, opened }: navSlideProps) => {
  const { user, logout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    window.location.reload();
  };

  if (opened) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.content}>
          <div className={styles.navSlide}>
            <div className={styles.navSlide_imageContainer}>
              <Image
                onClick={() => onClose()}
                src={"/close.svg"}
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
	      {user ? (
	        <button className={styles.navSlide_auth} onClick={handleLogoutClick}>ออกจากระบบ</button>
	      ) : (
	        <Link className={styles.navSlide_auth} href={getLoginUrl()}>เริ่มใช้งาน</Link>
	      )}
          </div>
	</div>

        <div
          className={styles.background}
          onClick={() => {
            onClose();
          }}
        ></div>
      </div>
    );
  } else {
    return;
  }
};

export default NavSlide;
