import { UserTableTransaction } from "@/app/types/api/table";
import { Status } from "@/app/types/api/transaction";
export const mockUserTableTransactions: UserTableTransaction[] = [
  {
    startTime: "2025-01-10",
    userTransaction: [
      {
        itemName: "Laptop Dell Latitude 5440",
        assetId: "ASSET-001",
        endTime: "2025-01-10T17:30:00Z",
        message: "ใช้งานประชุมทีม",
        status: Status.Approved,
      },
      {
        itemName: "iPad Pro 11”",
        assetId: "ASSET-002",
        endTime: "2025-01-10T18:00:00Z",
        message: "พรีเซนต์งานลูกค้า",
        status: Status.Finished,
      },
    ],
  },
  {
    startTime: "2025-01-15",
    userTransaction: [
      {
        itemName: "Projector Epson EB-X500",
        assetId: "ASSET-003",
        endTime: "2025-01-15T16:00:00Z",
        message: "ใช้งานอบรมภายใน",
        status: Status.Pending,
      },
    ],
  },
  {
    startTime: "2025-01-18",
    userTransaction: [
      {
        itemName: "Meeting Room A",
        assetId: "ROOM-A",
        endTime: "2025-01-18T12:00:00Z",
        message: "ยกเลิกการจอง",
        status: Status.Cancel,
      },
    ],
  },
  {
    startTime: "2025-01-20",
    userTransaction: [
      {
        itemName: "MacBook Pro M2",
        assetId: "ASSET-004",
        endTime: "2025-01-20T17:00:00Z",
        message: "ขอยืมทดสอบระบบ",
        status: Status.Rejected,
      },
      {
        itemName: "Camera Sony A7 III",
        assetId: "ASSET-005",
        endTime: "2025-01-20T18:30:00Z",
        message: "",
        status: Status.Blank,
      },
    ],
  },
];
