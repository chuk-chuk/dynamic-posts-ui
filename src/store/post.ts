import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state: PostsState, action: PayloadAction<any>) => {
      const existingPosts = state.posts;
      const newPost = action.payload;
      const newPosts = [...existingPosts, newPost];
      state.posts = newPosts;
    },
    getPosts: (state: PostsState) => {
      const existingPosts = state.posts;
      state.posts = existingPosts;
    },
    deletePost: (state: PostsState, action: PayloadAction<any>) => {
      const id = action.payload;
      state.posts = state.posts.filter((item) => item.id !== id);
    },
  },
});

export const { addPost, getPosts, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
