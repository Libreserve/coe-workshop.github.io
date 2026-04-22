import { apiSlice } from "../apiSlice";
import { createSelector } from "@reduxjs/toolkit";
import { Tool, Tools } from "./tool.typs";

export const initialTools: Tools = [];

export const apiSliceWithToolsAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<Tools, void>({
      query: () => `/items`,
      keepUnusedDataFor: 300,
      transformResponse: (res: any) => res?.data?.items ?? [],
      providesTags: (result = []) =>
        result
          ? [
              { type: "Tools" as const, id: "LIST" },
              ...result.map((tool) => ({ type: "Tools" as const, id: tool.id })),
            ]
          : [{ type: "Tools" as const, id: "LIST" }],
    }),
    getTool: builder.query<Tool, number>({
      query: (toolId) => ({ url: `/items/${toolId}`, method: "GET" }),
      transformResponse: (res: any) => res?.data ?? {},
      providesTags: (result, error, arg) => [
        { type: "Tools" as const, id: arg },
      ],
    }),
    deleteTool: builder.mutation<object, { toolId: number }>({
      query: ({ toolId }) => ({
        url: `/items/${toolId}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, error, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.toolId },
      ],
    }),
    createTool: builder.mutation<Tool, FormData>({
      query: (formData) => ({
        url: `/items`,
        method: "POST",
        body: formData,
      }),
      transformResponse: (res: any) => res?.data ?? {},
      invalidatesTags: [{ type: "Tools" as const, id: "LIST" }],
    }),
    updateTool: builder.mutation<Tool, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: formData,
      }),
      transformResponse: (res: any) => res?.data ?? {},
      invalidatesTags: (result, error, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.id },
      ],
    }),
    updateToolAssets: builder.mutation<
      Tool,
      { toolId: number; assets_id: number[] | null }
    >({
      query: ({ toolId, assets_id }) => ({
        url: `/items/${toolId}/assets`,
        method: "PATCH",
        body: { assets_id },
      }),
      transformResponse: (res: any) => res?.data ?? {},
      invalidatesTags: (result, error, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.toolId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetToolsQuery,
  useDeleteToolMutation,
  useCreateToolMutation,
  useGetToolQuery,
  useUpdateToolMutation,
  useUpdateToolAssetsMutation,
} = apiSliceWithToolsAdmin;
