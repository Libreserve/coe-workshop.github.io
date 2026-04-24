import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import HttpStatus from "http-status";
import { getLoginUrl } from "../api";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
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
      console.warn(
        "Session expired or unauthorized - clearing session",
      );

      try {
        await fetch(`/api/v1/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch {}

      const isAdminRoute = window.location.pathname.startsWith("/admin");
      window.location.href = isAdminRoute ? "/admin/login" : getLoginUrl();
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tools", "Transaction", "Report"],
  endpoints: () => ({}),
});
