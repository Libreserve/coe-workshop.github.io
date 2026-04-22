import { apiSlice } from "../apiSlice";
// Lightweight admin transactions API wrapper
type TranactionQueryElement = {
  toolId?: number | null;
  userId?: string | null;
  date?: string | null;
  page?: number | null;
};

type ToolTransactionData = any;
type ToolTransactionResponse = any;
export const apiSliceWithTransactionsAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToolTransaction: builder.query<ToolTransactionData, TranactionQueryElement>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args.toolId) params.set("item", String(args.toolId));
        if (args.userId) params.set("user", args.userId);
        if (args.date) params.set("date", args.date);
        if (args.page) params.set("page", String(args.page));
        return `/transactions?${params.toString()}`;
      },
      keepUnusedDataFor: 300,
      transformResponse: (res: any) => res?.data ?? {},
      // providesTags could be added if needed
    }),
    getAllTransactionsByStatus: builder.query<any, { status: string; page?: number }>({
      query: ({ status, page = 1 }) => {
        const params = new URLSearchParams();
        params.set("status", status);
        params.set("page", String(page));
        return `/transactions/by-status?${params.toString()}`;
      },
      keepUnusedDataFor: 300,
      transformResponse: (res: any) => res?.data ?? {},
      providesTags: ["Transaction"],
    }),
    updateTransactionStatus: builder.mutation<any, any>({
      query: (body) => ({
        url: `/transactions/${body.transactionId}`,
        method: "PATCH",
        body: {
          isApproved: body.isApproved,
          message: body.message,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetToolTransactionQuery,
  useGetAllTransactionsByStatusQuery,
  useUpdateTransactionStatusMutation,
} = apiSliceWithTransactionsAdmin;
