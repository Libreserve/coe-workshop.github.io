export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  available: boolean;
  quantity: number;
}

export type Tools = Tool[];