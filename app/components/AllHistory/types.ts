interface Transaction {
  status: Status
  startDay: string 
  email: string
  toolList: ToolList
}

interface Tool {
  name: string 
  image: string 
  quantity: number
}

type ToolList = Tool[]

interface History{
  transactions: Transaction[]
}