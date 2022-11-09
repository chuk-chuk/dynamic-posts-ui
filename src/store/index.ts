import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";

const reducer = combineReducers({
  posts: postReducer,
});

export const store = configureStore({
  reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
