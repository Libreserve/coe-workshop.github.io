import { BaseTransaction } from "./transaction";
import { User } from "./user";

interface UserTransaction extends BaseTransaction {
  itemName: string;
  assetId: string;
}

export interface UserTableTransaction {
  startTime: string;
  userTransaction: UserTransaction[];
}
