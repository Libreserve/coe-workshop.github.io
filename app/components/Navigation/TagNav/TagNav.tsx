import { TagProps } from "./TagNav.type";
import Link from "next/link";
import styles from "./TagNav.module.scss";
export const TagNav = ({ title, href = "" }: TagProps) => {
  return (
    <div className={styles.tagNav}>
      <Link href={href}>{title}</Link>
    </div>
  );
};
