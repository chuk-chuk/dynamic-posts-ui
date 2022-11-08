import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsSlice from "./post";

const reducer = combineReducers({
  postData: postsSlice,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
