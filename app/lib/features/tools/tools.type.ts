export enum ToolCategories {
  MECHANICAL = "MECHANICAL",
  ELECTRICAL = "ELECTRICAL",
  PNEUMATIC = "PNEUMATIC",
  HYDRAULIC = "HYDRAULIC",
  MEASUREMENT = "MEASUREMENT",
  SOLDERING = "SOLDERING",
  HAND_TOOLS = "HAND_TOOLS",
  POWER_TOOLS = "POWER_TOOLS",
  SAFETY = "SAFETY",
  ROBOTICS = "ROBOTICS",
  AUTOMATION = "AUTOMATION",
  PROTOTYPING = "PROTOTYPING",
  THREE_D_PRINTING = "THREE_D_PRINTING",
  CNC = "CNC",
  MAINTENANCE = "MAINTENANCE",
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
  totalQuantity?: number;
  availableQuantity?: number;
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
  success: boolean;
  error: string | null;
  message?: string | null;
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

export interface Asset {
  id: number;
  assetID: string;
  item: {
    id: number;
    name: string;
  } | null;
}
