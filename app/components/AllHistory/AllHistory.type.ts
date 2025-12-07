export enum TransactionStatus {
  PENDING = "pending",
  DOING = "doing",
  REJECTED = "rejected",
  RETURNED = "returned",
}

export interface TransactionProps {
  status: TransactionStatus;
  startDay: string;
  email: string;
  toolList: ToolProps[];
}

export interface ToolProps {
  name: string;
  image: string;
  quantity: number;
}

export interface HistoryProps {
  transactions: TransactionProps[];
}
