
export interface Tool {
    name: string;
    image: string;
    quantity: number;
}

export type Status = "pending" | "doing" | "rejected" | "returned";

export interface Transaction {
    toolList: Tool[];
    status: Status;
    startDay: string;
}

export interface HistoryCard {
    transaction: Transaction;
    email:string
}

export interface Item {
    title:string,
    quantity: number
}

export type Items = Item[];
