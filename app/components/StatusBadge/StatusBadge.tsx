import styles from "../StatusBadge/StatusBadge.module.scss";
import  { StatusBadgesProps, TransactionStatus } from "./StatusBadge.type";
const StatusBadge = ({status}:StatusBadgesProps) => {
      const getTransactionStatusTH:Record<TransactionStatus, string> = {
          [TransactionStatus.PENDING]: "รออนุมัติ",
          [TransactionStatus.DOING]: "ระหว่างใช้",
          [TransactionStatus.REJECTED]: "ปฏิเสธ",
          [TransactionStatus.RETURNED]: "คืนแล้ว",
        }
    return (
            <div className={`${styles[status]}`}>
                <p>{status ? getTransactionStatusTH[status] : "ไม่พบสถานะ"}</p>
            </div>
    )
};

export default StatusBadge;
