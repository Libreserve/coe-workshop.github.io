import { ItemTransaction } from "@/app/types/api/table";

export interface TransactionInfoProps extends ItemTransaction {
  onClose: () => void;
}
