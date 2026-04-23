export interface BaseTransaction {
  endTime: string;
  message: string;
  status: Status;
}

export enum Status {
  "Approved",
  "Pending",
  "Finished",
  "Rejected",
  "Cancel",
  "Blank",
}

export const statusVariant: Record<Status, { title: string; color: string }> = {
  [Status.Approved]: { title: "อนุมัติ", color: "#6fa7ef" },
  [Status.Pending]: { title: "รออนุมัติ", color: "#beef6f" },
  [Status.Finished]: { title: "เสร็จสิ้น", color: "#ffadf3" },
  [Status.Rejected]: { title: "ปฏิเสธ", color: "#efa26f" },
  [Status.Cancel]: { title: "ยกเลิก", color: "#ef4444" },
  [Status.Blank]: { title: "ว่าง", color: "#cccccc" },
};

export interface StatusTag {
  status: Status;
}

/**
 * Admin variant of BaseTransaction using endedAt (vs main's endTime)
 * Kept separate to avoid breaking main app's Status enum
 */
export interface AdminBaseTransaction {
  endedAt: string;
  message: string;
  status: AdminStatus;
}

/**
 * Admin-specific Status enum (uppercase values vs main's TitleCase)
 * Renamed to avoid collision with main's Status enum
 */
export enum AdminStatus {
  REJECT = "REJECT",
  RESERVE = "RESERVE",
  APPROVE = "APPROVE",
  Finished = "finished",
  Cancel = "Cancel",
  Blank = "Blank",
}

export const adminStatusVariant: Record<AdminStatus, { title: string; color: string }> = {
  [AdminStatus.APPROVE]: { title: "อนุมัติ", color: "#beef6f" },
  [AdminStatus.RESERVE]: { title: "รออนุมัติ", color: "#6fa7ef" },
  [AdminStatus.Finished]: { title: "เสร็จสิ้น", color: "#ffadf3" },
  [AdminStatus.REJECT]: { title: "ปฏิเสธ", color: "#efa26f" },
  [AdminStatus.Cancel]: { title: "ยกเลิก", color: "#ef4444" },
  [AdminStatus.Blank]: { title: "ว่าง", color: "#cccccc" },
};

export interface AdminStatusTag {
  status: AdminStatus;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
}

// Transaction history types for admin history page
export interface UserTransactionItem {
  itemName: string;
  assetID: string;
  startedAt: string;
  endedAt: string;
  status: AdminStatus;
  message: string | null;
}

export interface UserTransactionDay {
  startTime: string;
  userTransactions: UserTransactionItem[];
}

export interface UserTransactionHistory {
  user: {
    phone: string;
    userName: string;
    faculty: string | null;
  };
  transactions: UserTransactionDay[];
}

export interface UserTransactionHistoryResponse {
  success: boolean;
  data: UserTransactionHistory;
}
