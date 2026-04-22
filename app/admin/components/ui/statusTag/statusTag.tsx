import { adminStatusVariant, statusVariant, AdminStatus, Status } from "@/app/types/api/transaction";
import styles from "./statusTag.module.scss";
import { StatusTagProps } from "./statusTag.types";

const adminStatusValues = Object.values(AdminStatus);

function isAdminStatus(status: AdminStatus | Status): status is AdminStatus {
  return adminStatusValues.includes(status as AdminStatus);
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const variant = isAdminStatus(status) ? adminStatusVariant[status] : statusVariant[status as Status];
  return (
    <div>
      <h3
        className={styles.statusTag}
        style={{ backgroundColor: variant.color }}
      >
        {variant.title}
      </h3>
    </div>
  );
};
