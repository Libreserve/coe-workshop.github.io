export interface ItemProps {
  url: string;
  imageUrl: string;
  title: string;
  description: string;
  quantity: number;
  available: number;
}
export interface UserCartProps {
  items: ItemProps[];
}
export interface CartItemsProps {
  item: ItemProps;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

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
  email: string;
  toolList: ToolProps[];
  status: TransactionStatus;
  startDay: string;
}
