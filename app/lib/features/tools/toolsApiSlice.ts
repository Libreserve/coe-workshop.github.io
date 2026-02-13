import { apiSlice } from "../apiSlice";
import { createSelector } from "@reduxjs/toolkit";
import type { Tool, Tools, ToolsResponse, ToolResponse } from "./tools.type";

export const initialState: Tools = [];
export const apiSliceWithTools = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<Tools, void>({
      query: () => "/v1/items",
      keepUnusedDataFor: 300,
      transformResponse(res: ToolsResponse) {
        return res.data;
      },
      providesTags: (result = []) =>
        result
          ? [
              { type: "Tools" as const, id: "LIST" },
              ...result.map((tool) => ({
                type: "Tools" as const,
                id: tool.id,
              })),
            ]
          : [{ type: "Tools" as const, id: "LIST" }],
    }),

    getTool: builder.query<Tool, number>({
      query: (toolId) => ({ url: `/v1/items/${toolId}`, method: "GET" }),
      transformResponse(res: ToolResponse) {
        return res.data;
      },
      providesTags: (result, error, arg) => [
        { type: "Tools" as const, id: arg },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetToolsQuery, useGetToolQuery } = apiSliceWithTools;

export const selectToolsResult =
  apiSliceWithTools.endpoints.getTools.select(undefined);

const selectToolsData = createSelector(
  selectToolsResult,
  (result) => result.data ?? initialState,
);
export const selectAllTools = selectToolsData;

export const selectToolById = (toolId: number) =>
  createSelector(selectToolsData, (tools) =>
    tools.find((tool) => tool.id === toolId),
  );
