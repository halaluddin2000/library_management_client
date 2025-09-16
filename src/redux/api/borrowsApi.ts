import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowsApi = createApi({
  reducerPath: "borrowsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
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
