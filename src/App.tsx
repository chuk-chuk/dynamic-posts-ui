import React, { useEffect } from "react";
import { fetchPosts } from "./features/posts/fetchPosts";
import { postsSelector } from "./features/posts/postSlice";
import "./index.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
  const { posts, isLoading, error } = useAppSelector(postsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <p>Loading posts ...</p>;
  if (error) return <p>Cannot display posts ...</p>;

  console.log(posts);

  return (
    <div>
      <h2 className="text-2xl underline text-red-600">Posts: {posts.length}</h2>
    </div>
  );
}

export default App;
