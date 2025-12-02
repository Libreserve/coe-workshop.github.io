export interface DropDown {
     onChange?: (value?: string | void) => void;
     value?: string 
}

export type Status = "pending" | "doing" | "rejected" | "returned" ;
