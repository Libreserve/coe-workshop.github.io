import { StatusTag } from "../../ui/statusTag/statusTag";
import styles from "./transactionInfo.module.scss";
import { TransactionInfoProps } from "./transactionInfo.types";
export const TransactionInfo = ({
  user,
  startedAt,
  endTime,
  message,
  status,
  onClose,
}: TransactionInfoProps & { endTime?: string }) => {
  return (
    <div className={styles.info}>
      <section>
        <div className={styles.header}>
          <span>
            <h2>รายละเอียดการจอง</h2>
          </span>
          <StatusTag status={status}></StatusTag>
        </div>
        <span>
          <p>ผู้ยื่นคำร้อง:</p>
          <p>{(user as any).userName || user.username}</p>
        </span>
        <span>
          <p>เบอร์โทรติดต่อ:</p>
          <p>{(user as any).phone || user.tel}</p>
        </span>
        <span>
          <p>คำร้อง:</p>
          <p>{message}</p>
        </span>
        <span>
          <p>เวลาเริ่ม:</p>
          <p>{startedAt}</p>
        </span>
        <span>
          <p>เวลาสิ้นสุด:</p>
          <p>{endTime}</p>
        </span>
      </section>
      <hr className={styles.line} />
      <section>
        <span>
          <h3>เกี่ยวกับอุปกรณ์</h3>
        </span>
        <div className={styles.tool}>
          <h3>ชื่อของอุปกรณ์</h3>
        </div>
      </section>
      <section className={styles.action}>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onClose();
          }}
        >
          <button type="submit" className={styles.action_button}>
            ปิด
          </button>
        </form>
      </section>
    </div>
  );
};
