import { Post } from "../../types";
import { getPostsFailure, getPostsLoading, getPostsSuccess } from "./postSlice";

const baseUrl = "https://jsonplaceholder.typicode.com";

export const fetchPosts = () => async (dispatch: any) => {
  try {
    dispatch(getPostsLoading(true));
    const response = await fetch(`${baseUrl}/posts`);
    const data: Post[] = await response.json();
    dispatch(getPostsSuccess(data));
  } catch (error: any) {
    dispatch(getPostsFailure(error));
  } finally {
    dispatch(getPostsLoading(false));
  }
};
