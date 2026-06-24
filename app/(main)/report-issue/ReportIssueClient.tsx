"use client";
import Link from "next/link";
import { useState } from "react";
import { useCreateReportMutation } from "@/app/lib/features/admin/reportsApi";
import { ReportType, reportTypeLabels } from "@/app/types/api/report";
import { useAuth } from "@/app/Context/AuthContext/AuthContext";
import { Select } from "@/app/components/Select/Select";
import styles from "./ReportIssue.module.scss";
import ModalContainer from "@/app/components/ModalContainer/modalContainer";

const reportTypeOptions = Object.values(ReportType).map((t) => ({
  label: reportTypeLabels[t],
  value: t,
}));

export const ReportIssue = () => {
  const { user } = useAuth();
  const [createReport, { isLoading, isSuccess }] = useCreateReportMutation();

  const [type, setType] = useState<ReportType>(ReportType.BUG);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || title.length < 2) {
      setError("หัวข้อต้องมีอย่างน้อย 2 ตัวอักษร");
      return;
    }

    if (!description.trim() || description.length < 10) {
      setError("คำอธิบายต้องมีอย่างน้อย 10 ตัวอักษร");
      return;
    }

    setIsOpenConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setIsOpenConfirm(false);

    try {
      await createReport({
        type,
        title: title.trim(),
        description: description.trim(),
        email: user ? user.email : email,
      }).unwrap();

      // Reset frm
      setType(ReportType.BUG);
      setTitle("");
      setDescription("");
      setEmail("");
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <h2>ส่งรายงานสำเร็จ</h2>
          <p>ขอบคุณสำหรับการแจ้งปัญหา เราจะดำเนินการโดยเร็วที่สุด</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.submitButton}
          >
            ส่งรายงานใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>แจ้งปัญหา / ข้อเสนอแนะ</h1>

        <ModalContainer
          opened={isOpenConfirm}
          onClose={() => setIsOpenConfirm(false)}
        >
          <div className={styles.modalContent}>
            <h3 className={styles.modalContent_title}>ยืนยันการส่งรายงาน?</h3>
            <p className={styles.modalContent_des}>
              คุณเป็นนักศึกษาคณะวิศวกรรมคอมพิวเตอร์,โปรแกรมเมอร์
              หรือมีความสามารถในการพัฒนาโปรแกรม (ตอบแค่ ใช่ หรือ ไม่)
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancel}
                onClick={() => handleConfirmSubmit()}
              >
                ไม่
              </button>
              <button className={styles.confirm} disabled={isLoading}>
                <Link href="https://github.com/Libreserve/coe-workshop.github.io/issues/">
                  {isLoading ? "กำลังส่ง..." : "ใช่ ฉันเป็น"}
                </Link>
              </button>
            </div>
          </div>
        </ModalContainer>

        <form onSubmit={handleOpenConfirmation} className={styles.form}>
          <div className={styles.formGroup}>
            <label>ประเภท</label>
            <Select
              value={type}
              onChange={(value) => setType(value as ReportType)}
              options={reportTypeOptions}
              size="lg"
              variant="outline"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">หัวข้อ</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ระบุหัวข้อสั้นๆ"
              className={styles.input}
              maxLength={256}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">รายละเอียด</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="อธิบายปัญหาหรือข้อเสนอแนะของคุณ"
              className={styles.textarea}
              rows={6}
              maxLength={5000}
            />
          </div>

          {!user && (
            <div className={styles.formGroup}>
              <label htmlFor="email">อีเมล (ไม่บังคับ)</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={styles.input}
              />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            ส่งรายงาน
          </button>
        </form>
      </div>
    </div>
  );
};
