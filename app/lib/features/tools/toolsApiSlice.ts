import { apiSlice } from "../apiSlice";
import { createSelector } from "@reduxjs/toolkit";
import type { Tool, Tools, ToolsResponse, ToolResponse, ToolsFilter } from "./tools.type";

export const initialState: Tools = [];

const buildQueryParams = (filter?: ToolsFilter): string => {
  const params = new URLSearchParams();
  if (filter?.category) {
    params.set("category", filter.category);
  }
  if (filter?.search) {
    params.set("search", filter.search);
  }
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

export const apiSliceWithTools = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<Tools, ToolsFilter | void>({
      query: (filter) => `/v1/items${buildQueryParams(filter ?? undefined)}`,
      keepUnusedDataFor: 300,
      transformResponse(res: ToolsResponse) {
        return res.data.items;
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

export const selectToolsResult = (filter?: ToolsFilter) =>
  apiSliceWithTools.endpoints.getTools.select(filter);

const selectToolsData = (filter?: ToolsFilter) =>
  createSelector(
    selectToolsResult(filter),
    (result) => result.data ?? initialState,
  );

export const selectAllTools = selectToolsData();

export const selectToolById = (toolId: number) =>
  createSelector(selectToolsData(), (tools) =>
    tools.find((tool) => tool.id === toolId),
  );
