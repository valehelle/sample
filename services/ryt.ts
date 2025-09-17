import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AccountData,
  CreateTransactionBody,
  CreateTransactionResponse,
} from "./types";
export const rytApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ryt.com",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    getAccount: build.query<AccountData, void>({
      query: () => `account`,
    }),
    createTransaction: build.mutation<
      CreateTransactionResponse,
      CreateTransactionBody
    >({
      query: (body) => ({
        url: `transaction`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAccountQuery, useCreateTransactionMutation } = rytApi;
