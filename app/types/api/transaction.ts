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
