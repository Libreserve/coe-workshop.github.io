import { apiSlice } from "../apiSlice";
import { CreateTransactionRequest, UserTransactionHistory, UserTransactionHistoryResponse } from "@/app/types/api/transaction";

export const apiSliceWithTransactionsAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactionsByStatus: builder.query<any, { status?: string; page?: number; date?: string; userName?: string }>({
      query: ({ status, page = 1, date, userName }) => {
        const params = new URLSearchParams();
        if (status) params.set("status", status);
        params.set("page", String(page));
        if (date) params.set("date", date);
        if (userName) params.set("userName", userName);
        return `/transactions/by-status?${params.toString()}`;
      },
      keepUnusedDataFor: 300,
      transformResponse: (res: any) => res?.data ?? {},
      providesTags: ["Transaction"],
    }),
    getReservedByItem: builder.query<any, { itemId: number; date: string }>({
      query: ({ itemId, date }) => {
        const params = new URLSearchParams();
        params.set("item", String(itemId));
        params.set("date", date);
        return `/transactions/reserved-by-item?${params.toString()}`;
      },
      keepUnusedDataFor: 300,
      transformResponse: (res: any) => res?.data ?? {},
      providesTags: ["Transaction", "Assets"],
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
    updateAllTransactionsByUser: builder.mutation<any, { reserverId: string, isApproved: boolean, message: string }>({
      query: (body) => ({
        url: `/transactions/reserver/${body.reserverId}`,
        method: "PATCH",
        body: {
          isApproved: body.isApproved,
          message: body.message,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
    getUserTransactionHistory: builder.query<UserTransactionHistory, { userId?: string; userName?: string; page?: number }>({
      query: ({ userId, userName, page = 1 }) => {
        const params = new URLSearchParams();
        if (userId) params.set("user", userId);
        if (userName) params.set("userName", userName);
        params.set("page", String(page));
        return `/transactions/by-user?${params.toString()}`;
      },
      keepUnusedDataFor: 300,
      transformResponse(res: UserTransactionHistoryResponse) {
        return res.data;
      },
      providesTags: ["Transaction"],
    }),
    getHistoryMe: builder.query<UserTransactionHistory, { page?: number }>({
      query: ({ page = 1 }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        return `/transactions/history/me?${params.toString()}`;
      },
      keepUnusedDataFor: 300,
      transformResponse(res: UserTransactionHistoryResponse) {
        return res.data;
      },
      providesTags: ["Transaction"],
    }),
    createTransaction: builder.mutation<any, CreateTransactionRequest>({
      query: (body) => ({
        url: `/transactions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllTransactionsByStatusQuery,
  useUpdateTransactionStatusMutation,
  useUpdateAllTransactionsByUserMutation,
  useGetUserTransactionHistoryQuery,
  useGetHistoryMeQuery,
  useCreateTransactionMutation,
  useGetReservedByItemQuery,
} = apiSliceWithTransactionsAdmin;
