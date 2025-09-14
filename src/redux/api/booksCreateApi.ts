import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["book"],
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "books",
      providesTags: ["book"],
    }),
    addBook: build.mutation({
      query: (body) => ({
        url: "books/create-book",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksApi;
