import { apiSlice } from "../apiSlice";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  faculty?: string;
  role?: string;
  photo?: string;
}

export const apiSliceWithAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: [],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
        } catch {}
      },
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/user/me",
        credentials: "include",
      }),
      transformResponse: (res: any) => res.data,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = apiSliceWithAuth;
