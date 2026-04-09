export const enum ToolCategories {
  MACHINE = "MACHINE",
  HANDTOOL = "HANDTOOL",
  ELECTRONIC = "ELECTRONIC",
  OTHER = "OTHER"
}

export interface Tool {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  category: ToolCategories;
  categoryID?: number | null;
  assets_id: number[] | null;
}

export type Tools = Tool[];

export interface ToolsFilter {
  category?: ToolCategories;
  search?: string;
}

export interface ToolsResponse {
  data: {
    numberOfPage: number;
    items: Tools;
  };
  success: boolean;
  error: string | null;
}

export interface ErrorResponse {
  sucess: boolean;
  error: string | null;
}

export interface ToolErrorResponse {
  status: number;
  data: ErrorResponse;
}

export interface ToolResponse {
  data: Tool;
  success: boolean;
  error: string | null;
}
