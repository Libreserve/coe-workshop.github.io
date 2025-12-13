import styles from "./page.module.scss";
import Link from "next/link";
const Hello = () => {
  return (
    <div className={styles.hello}>
      <Link href={"/landing"} className={styles.message}>
        EN Workshop is on. 🥵
      </Link>
    </div>
  );
};

export default Hello;
