"use client";

import { useState } from "react";
import { useGetReportsQuery, useUpdateReportStatusMutation } from "@/app/lib/features/admin/reportsApi";
import { ReportStatus, ReportType, reportStatusLabels, reportTypeLabels } from "@/app/types/api/report";
import { Select } from "@/app/components/Select/Select";
import styles from "./Reports.module.scss";

const statusOptions = [
  { label: "ทุกสถานะ", value: "" },
  ...Object.values(ReportStatus).map((s) => ({ label: reportStatusLabels[s], value: s })),
];

const typeOptions = [
  { label: "ทุกประเภท", value: "" },
  ...Object.values(ReportType).map((t) => ({ label: reportTypeLabels[t], value: t })),
];

const statusChangeOptions = Object.values(ReportStatus).map((s) => ({
  label: reportStatusLabels[s],
  value: s,
}));

export const ReportsAdmin = () => {
  const [statusFilter, setStatusFilter] = useState<ReportStatus | undefined>();
  const [typeFilter, setTypeFilter] = useState<ReportType | undefined>();
  
  const { data: reports, isLoading } = useGetReportsQuery({ status: statusFilter, type: typeFilter });
  const [updateStatus] = useUpdateReportStatusMutation();

  const handleStatusChange = async (id: number, newStatus: ReportStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>จัดการรายงาน</h1>
        
        <div className={styles.filters}>
          <Select
            value={statusFilter || ""}
            onChange={(value) => setStatusFilter(value as ReportStatus || undefined)}
            options={statusOptions}
            size="sm"
          />
          
          <Select
            value={typeFilter || ""}
            onChange={(value) => setTypeFilter(value as ReportType || undefined)}
            options={typeOptions}
            size="sm"
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ประเภท</th>
              <th>หัวข้อ</th>
              <th>รายละเอียด</th>
              <th>อีเมล</th>
              <th>สถานะ</th>
              <th>วันที่</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report) => (
              <tr key={report.id} className={styles.reportRow}>
                <td>{report.id}</td>
                <td>{reportTypeLabels[report.type]}</td>
                <td className={styles.titleCell}>{report.title}</td>
                <td className={styles.descCell}>{report.description}</td>
                <td>{report.email || "-"}</td>
                <td>
                  <Select
                    value={report.status}
                    onChange={(value) => handleStatusChange(report.id, value as ReportStatus)}
                    options={statusChangeOptions}
                    size="sm"
                  />
                </td>
                <td>{new Date(report.createdAt).toLocaleDateString("th-TH")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!reports?.length && (
          <div className={styles.empty}>ไม่มีรายงาน</div>
        )}
      </div>
    </div>
  );
};
