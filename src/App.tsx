import React, { useEffect } from "react";
import { fetchPosts } from "./features/posts/fetchPosts";
import { postsSelector } from "./features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Graph from "./components/Graph/Graph";
import { GraphData } from "./types";
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
  // user should be able to delete any post from the list which should in turn
  // dynamically update the statistics. Note: The delete feature does not call any API and only will
  // only delete the post from the Redux store.

  const postDescriptions = posts.map((post) => post.body).flat();
  const descriptionWords = postDescriptions
    .map((body) => body.split(" "))
    .flat();
  const splitWords = descriptionWords.map((word) => word.split(/\r?\n/)).flat();

  const occurrences: GraphData = splitWords.reduce(
    (acc: GraphData, el: string) => {
      return acc[el] ? ++acc[el] : (acc[el] = 1), acc;
    },
    {}
  );

  const sortable = Object.fromEntries(
    Object.entries(occurrences)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  );

  const mappedData = Object.entries(sortable);

  return (
    <div className="m-20 bg-white border rounded-md shadow-md">
      <Graph
        data-testid="graph"
        graphData={mappedData}
        total={splitWords.length}
      />
    </div>
  );
}

export default App;
