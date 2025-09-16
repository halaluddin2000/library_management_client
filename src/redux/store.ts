import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./api/booksCreateApi";
import { borrowsApi } from "./api/borrowsApi";
// ...

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [borrowsApi.reducerPath]: borrowsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(borrowsApi.middleware);
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
