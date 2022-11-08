import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsSlice from "../features/posts/postSlice";

const reducer = combineReducers({
  posts: postsSlice,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
