import { TooltipProps } from "./tooltip.types";
import styles from "./tooltip.module.scss";
export const Tooltip = ({ title, children }: TooltipProps) => {
  return (
    <div className={styles.tooltip}>
      <div className={styles.chilren}>{children}</div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};
