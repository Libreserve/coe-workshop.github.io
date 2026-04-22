export enum catagories {}
export enum ToolCategories {
  MACHINE = "MACHINE",
  HANDTOOL = "HANDTOOL",
  ELECTRONIC = "ELECTRONIC",
  OTHER = "OTHER",
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
export interface ToolsResponse {
  data: {
    numberOfPage: number;
    items: Tools;
  };
  success: boolean;
  error: string | null;
}
export interface ToolResponse {
  data: Tool;
  success: boolean;
  error: string | null;
}

export interface ErrorResponse {
  success: boolean;
  error: string | null;
  message: string | null;
}

export interface ToolErrorResponse {
  status: number;
  data: ErrorResponse;
}

export interface ToolCreateRequest {
  name: string;
  description: string | null;
  imageUrl: string | null;
  categoryName: ToolCategories;
  assets_id: number[] | null;
}

export interface ToolUpdateRequest {
  id: number;
  updatedData: ToolCreateRequest;
}