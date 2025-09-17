import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccountData } from "./types";
export const rytApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ryt.com",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    getAccount: build.query<AccountData, void>({
      query: () => `account`,
    }),
    updateAccount: build.mutation({
      query: ({ name, ...patch }) => ({
        url: `post/${name}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAccountQuery, useUpdateAccountMutation } = rytApi;
