import { BaseTransaction } from "./transaction";

interface UserTransaction extends BaseTransaction {
  itemName: string;
  assetId: string;
}

export interface UserTableTransaction {
  startTime: string;
  userTransaction: UserTransaction[];
}
