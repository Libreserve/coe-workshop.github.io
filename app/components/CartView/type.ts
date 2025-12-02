export interface item {
        Url: string;
        ImageUrl: string;
        Title: string;
        Description: string;
        Quantity: number;
        Available: number;
}
export interface UserCart {
  items: item[];
}
export interface CartItemsMatches {
    item: item;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

export interface Tool {
    name: string;
    image: string;
    quantity: number;
}
export type Status = "pending" | "doing" | "rejected" | "returned";
export interface Transaction {
    email: string;
    toolList: Tool[];
    status: Status;
    startDay: string;
}
