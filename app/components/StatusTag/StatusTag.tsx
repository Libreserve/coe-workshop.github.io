import { Status, statusVariant } from "@/app/types/api/transaction";
import { StatusTagProps } from "./StatusTag.types";
import styles from "./StatusTag.module.scss";
export const StatusTag = ({ status }: StatusTagProps) => {
  const data = statusVariant[status];
  return (
    <div>
      <h3
        className={styles.statusTag}
        style={{ backgroundColor: statusVariant[status].color }}
      >
        {statusVariant[status].title}
      </h3>
    </div>
  );
};
