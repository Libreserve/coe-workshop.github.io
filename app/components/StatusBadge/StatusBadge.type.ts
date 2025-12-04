export enum TransactionStatus {
  PENDING = "pending",
  DOING = "doing",
  REJECTED = "rejected",
  RETURNED = "returned",
}
export interface StatusBadgesProps {
    status: TransactionStatus
}