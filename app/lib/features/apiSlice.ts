import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import HttpStatus from "http-status";
import { isAdminRoute } from "@/app/utils/isAdminRoute";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
  credentials: "include",
});

// Custom Base Query to handle auth errors
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (
      result.error.status === HttpStatus.UNAUTHORIZED ||
      result.error.status === HttpStatus.FORBIDDEN
    ) {
      if (isAdminRoute()) {
        console.warn(
          "Admin session expired or unauthorized - clearing session",
        );

        try {
          await fetch(`/api/v1/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch {}

        window.location.href = "/admin/login";
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tools", "Transaction", "Report", "Assets"],
  endpoints: () => ({}),
});

export const { util: { updateQueryData } } = apiSlice;
