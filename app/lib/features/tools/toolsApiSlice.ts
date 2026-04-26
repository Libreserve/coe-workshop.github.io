import { apiSlice } from "../apiSlice";
import type { Asset, Tool, Tools, ToolsResponse, ToolResponse, ToolErrorResponse } from "@/app/lib/features/tools/tools.type";
import { toToolCategory } from "./category.utils";

function transformToolResponse(backendTool: any): Tool {
  return {
    ...backendTool,
    category: toToolCategory(backendTool.category || backendTool.categoryName)!,
  };
}

export const toolsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<Tools, { category?: string; search?: string } | void>({
      query: (params) => ({
        url: "/items",
        params: params || {},
      }),
      keepUnusedDataFor: 300,
      transformResponse: (res: ToolsResponse) =>
        res?.data?.items.map(transformToolResponse) ?? [],
      providesTags: (result = []) =>
        result
          ? [
              { type: "Tools" as const, id: "LIST" },
              ...result.map((tool) => ({ type: "Tools" as const, id: tool.id })),
            ]
          : [{ type: "Tools" as const, id: "LIST" }],
    }),

    getTool: builder.query<Tool, string | number>({
      query: (toolId) => ({ url: `/items/${toolId}`, method: "GET" }),
      transformResponse: (res: ToolResponse) =>
        transformToolResponse(res?.data ?? {}),
      providesTags: (result, error, arg) => [
        { type: "Tools" as const, id: arg },
      ],
    }),

    createTool: builder.mutation<Tool, FormData>({
      query: (formData) => ({
        url: `/items`,
        method: "POST",
        body: formData,
      }),
      transformResponse: (res: ToolResponse) => res?.data ?? {},
      invalidatesTags: [{ type: "Tools" as const, id: "LIST" }],
    }),

    updateTool: builder.mutation<Tool, { id: string | number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (res: ToolResponse) => res?.data ?? {},
      invalidatesTags: (result, error, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.id },
      ],
    }),

  deleteTool: builder.mutation<object, { toolId: string | number }>({
      query: ({ toolId }) => ({
        url: `/items/${toolId}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, error, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.toolId },
      ],
    }),

    createAsset: builder.mutation<
      object,
      { itemID: number; assetID: string[] }
    >({
      query: ({ itemID, assetID }) => ({
        url: `/assets`,
        method: "POST",
        body: { itemID, assetID },
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Tools" as const, id: "LIST" },
      //   { type: "Tools" as const, id: arg.itemID },
      // ],
      invalidatesTags: ["Assets"],
    }),

    deleteAsset: builder.mutation<
      object,
      { itemID: number; assetID: string }
    >({
      query: ({ itemID, assetID }) => ({
        url: `/assets`,
        method: "DELETE",
        body: { itemID, assetID },
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Tools" as const, id: "LIST" },
      //   { type: "Tools" as const, id: arg.itemID },
      // ],
      invalidatesTags: ["Assets"],
    }),

    getAllAssets: builder.query<Asset[], void>({
      query: () => ({
        url: "/assets",
        method: "GET",
      }),
      providesTags: (result = []) =>
        result
          ? [
              { type: "Assets" as const, id: "LIST" },
              ...result.map((asset) => ({ type: "Assets" as const, id: asset.id })),
            ]
          : [{ type: "Assets" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetToolsQuery,
  useGetToolQuery,
  useCreateToolMutation,
  useUpdateToolMutation,
  useDeleteToolMutation,
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useGetAllAssetsQuery,
} = toolsApiSlice;
