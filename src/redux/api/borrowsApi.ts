import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowsApi = createApi({
  reducerPath: "borrowsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books", "Borrows"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrows"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowsApi;
