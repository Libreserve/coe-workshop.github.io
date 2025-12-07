export interface DropDownProps {
  onChange?: (value?: TransactionStatus | undefined) => void;
  value?: TransactionStatus | undefined;
}

export enum TransactionStatus {
  PENDING = "pending",
  DOING = "doing",
  REJECTED = "rejected",
  RETURNED = "returned",
}
