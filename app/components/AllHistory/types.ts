export type Status = "pending" | "doing" | "rejected" | "returned";

export interface Transaction {
  status: Status
  startDay: string 
  email: string
  toolList: ToolList
}

export interface Tool {
  name: string 
  image: string 
  quantity: number
}

export type ToolList = Tool[]

export interface History{
  transactions: Transaction[]
}