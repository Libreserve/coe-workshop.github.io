import { Status } from "../StatusBadge/type";
interface Tool {
  name: string;
  image: string;
  quantity: number;
}

interface Transaction {
  toolList: Tool[];
  status: Status;
  startDay: string;
}

export interface HistoryCardProps {
  transaction: Transaction;
  email: string;
}

interface Item {
  title: string;
  quantity: number;
}
export type Items = Item[];
