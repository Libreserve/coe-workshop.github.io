import { apiSlice } from "../apiSlice";
import { Tool, Tools } from "@/app/types/tools";

export const toolsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<Tools, { category?: string; search?: string }>({
      query: ({ category, search }) => ({
        url: "/items",
        params: { category, search },
      }),
      providesTags: ["Tools"],
    }),
    getTool: builder.query<Tool, string>({
      query: (id) => `/items/${id}`,
      providesTags: ["Tools"],
    }),
    createTool: builder.mutation<Tool, FormData>({
      query: (body) => ({
        url: "/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tools"],
    }),
    updateTool: builder.mutation<Tool, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tools"],
    }),
    deleteTool: builder.mutation<void, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tools"],
    }),
  }),
});

export const {
  useGetToolsQuery,
  useGetToolQuery,
  useCreateToolMutation,
  useUpdateToolMutation,
  useDeleteToolMutation,
} = toolsApiSlice;