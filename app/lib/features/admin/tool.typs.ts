export {
  ToolCategories,
} from "@/app/lib/features/tools/tools.type";

export type {
  Tool,
  Tools,
  ToolsFilter,
  ToolsResponse,
  ToolResponse,
  ErrorResponse,
  ToolErrorResponse,
} from "@/app/lib/features/tools/tools.type";

import { ToolCategories } from "@/app/lib/features/tools/tools.type";

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
