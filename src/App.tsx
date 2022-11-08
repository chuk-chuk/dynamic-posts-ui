import React, { useEffect } from "react";
import { fetchPosts } from "./features/posts/fetchPosts";
import { postsSelector } from "./features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import "./index.css";

function App() {
  const { posts, isLoading, error } = useAppSelector(postsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <p>Loading posts ...</p>;
  if (error) return <p>Cannot display posts ...</p>;

  // display renders all the items from this endpoint

  // the app should display a statistics section at the top with the following
  // statistics:
  // ● Total Word Count – the total word count across all the posts
  // ● Top Five Frequent Words – the top five most used words across all the posts

  // user should be able to delete any post from the list which should in turn
  // dynamically update the statistics. Note: The delete feature does not call any API and only will
  // only delete the post from the Redux store.

  // assessing code quality
  // code structure/architecture
  // error handling

  const postDescriptions = posts.map((post) => post.body).flat();
  const descriptionWords = postDescriptions
    .map((body) => body.split(" "))
    .flat();
  const splitWords = descriptionWords.map((word) => word.split(/\r?\n/)).flat();

  const occurrences: Record<string, number> = splitWords.reduce(
    (acc: Record<string, number>, el: string) => {
      return acc[el] ? ++acc[el] : (acc[el] = 1), acc;
    },
    {}
  );

  const sortable = Object.fromEntries(
    Object.entries(occurrences)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  );

  console.log(sortable);

  return (
    <div>
      <h2 className="text-2xl underline text-red-600">Posts: {posts.length}</h2>
      <h2 className="text-green-600">Total Word Count: {splitWords.length}</h2>
      <h2 className="text-blue-600">Top Five Frequent Words: {posts.length}</h2>
    </div>
  );
}

export default App;
