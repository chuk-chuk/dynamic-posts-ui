import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import { fetchPosts } from "./features/posts/fetchPosts";
import { deletePost, postsSelector } from "./features/posts/postSlice";
import Graph from "./components/Graph/Graph";
import usePagination from "./components/PaginatedItems/Pagination";
import { ListItem } from "./components/ListItem/ListItem";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { GraphData } from "./types";
import "./index.css";

function App() {
  const { posts, isLoading, error } = useAppSelector(postsSelector);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(posts.length / PER_PAGE);
  const postData = usePagination(posts, PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <p>Loading posts ...</p>;
  if (error) return <p>Cannot display posts ...</p>;

  const handleChange = (e: any, p: number) => {
    setPage(p);
    postData.jump(p);
  };

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

  const handleItemClick = (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="m-20">
      <div className="mb-10 bg-white border rounded-md shadow-md">
        <Graph
          data-testid="graph"
          graphData={mappedData}
          total={splitWords.length}
        />
      </div>

      <div className="mb-8">
        {postData.currentData().map((post, index) => {
          return (
            <ListItem
              listItem={post}
              key={index}
              onClick={() => handleItemClick(post.id)}
            />
          );
        })}
      </div>

      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
