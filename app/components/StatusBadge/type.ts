export type Status = "pending" | "doing" | "rejected" | "returned";

export interface StatusBadgesProps {
  status: Status;
}
