import { TooltipProps } from "./types";
import styles from "./Tooltip.module.scss";
export const Tooltip = ({ title, children }: TooltipProps) => {
  return (
    <div className={styles.tooltip}>
      <div className={styles.chilren}>{children}</div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};
