import styles from "../StatusBadge/StatusBadge.module.scss";
function StatusBadge({status}:StatusBadges) {
    const getStateInThai:Record<Status, string> = {
        pending: "รออนุมัติ",
        doing: "ระหว่างใช้",
        rejected: "ปฎิเสธ",
        returned: "คืนแล้ว",
    }
    return (
            <div className={`${styles[status]}`}>
                <p>{getStateInThai[status] ?? "ไม่พบสถานะ"}</p>
            </div>
    )
};

export default StatusBadge;