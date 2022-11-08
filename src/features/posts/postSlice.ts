import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Post, PostsState } from "../../types";

const initialState: PostsState = {
  isLoading: false,
  error: null,
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    getPostsSuccess: (state, { payload }: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.posts = payload;
    },
    getPostsFailure: (state, { payload }: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { getPostsLoading, getPostsSuccess, getPostsFailure } =
  postsSlice.actions;

export default postsSlice.reducer;

export const postsSelector = (state: RootState) => state.posts;
