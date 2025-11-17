
interface Tool {
    name: string;
    image: string;
    quantity: number;
}

interface Transaction {
    toolList: Tool[];
    status: Status;
    startDay: string;
}

interface HistoryCard {
    transaction: Transaction;
    email:string
}

interface Item {
    title:string,
    quantity: number
}
type Items = Item[];
