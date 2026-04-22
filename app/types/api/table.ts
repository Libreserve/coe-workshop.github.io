import { BaseTransaction } from "./transaction";
import { User, AdminUser } from "./user";

interface UserTransaction extends BaseTransaction {
  itemName: string;
  assetId: string;
}

export interface UserTableTransaction {
  startTime: string;
  userTransaction: UserTransaction[];
}

export interface ItemTransaction extends BaseTransaction {
  user: User;
  startedAt: string;
}

export interface ItemTableTransaction {
  assetID: string;
  transactions: ItemTransaction[];
}

interface AdminTransaction extends BaseTransaction {
  itemName: string;
  assetID: string;
  startedAt: string;
}

export interface AdminTableTransaction {
  user: AdminUser;
  adminTransactions: AdminTransaction[];
}
