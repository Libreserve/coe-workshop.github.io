import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://dev-coe.ionize13.com/api";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Tools", "Transaction"],
  endpoints: () => ({}),
});
