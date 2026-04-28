export enum ReportType {
  BUG = "BUG",
  FEATURE = "FEATURE",
  FEEDBACK = "FEEDBACK",
}

export enum ReportStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}

export interface Report {
  id: number;
  type: ReportType;
  title: string;
  description: string;
  email: string | null;
  userId: string | null;
  status: ReportStatus;
  createdAt: string;
}

export interface CreateReportRequest {
  type: ReportType;
  title: string;
  description: string;
  email?: string;
}

export interface UpdateReportStatusRequest {
  status: ReportStatus;
}

export const reportTypeLabels: Record<ReportType, string> = {
  [ReportType.BUG]: "แจ้งปัญหา",
  [ReportType.FEATURE]: "ขอฟีเจอร์ใหม่",
  [ReportType.FEEDBACK]: "ข้อเสนอแนะ",
};

export const reportStatusLabels: Record<ReportStatus, string> = {
  [ReportStatus.PENDING]: "รอดำเนินการ",
  [ReportStatus.IN_PROGRESS]: "กำลังดำเนินการ",
  [ReportStatus.RESOLVED]: "แก้ไขแล้ว",
};