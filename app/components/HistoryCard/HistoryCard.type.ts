export interface ToolProps {
  name: string;
  image: string;
  quantity: number;
}

export enum TransactionStatus {
  PENDING = "pending",
  DOING = "doing",
  REJECTED = "rejected",
  RETURNED = "returned",
}

export interface TransactionProps {
  toolList: ToolProps[];
  status: TransactionStatus;
  startDay: string;
}

export interface HistoryCardProps {
  transaction: TransactionProps;
  email: string;
}

export interface ItemProps {
  title: string;
  quantity: number;
}

export type ItemsProps = ItemProps[];
