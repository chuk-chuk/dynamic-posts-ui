import { Post } from "../../types";
import { getPostsFailure, getPostsLoading, getPostsSuccess } from "./postSlice";

export const fetchPosts = () => async (dispatch: any) => {
  try {
    dispatch(getPostsLoading(true));
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data: Post[] = await response.json();
    dispatch(getPostsSuccess(data));
  } catch (error: any) {
    console.log(error);
    dispatch(getPostsFailure(error));
  } finally {
    dispatch(getPostsLoading(false));
  }
};
