import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import { fetchPosts } from "./features/posts/fetchPosts";
import { deletePost, postsSelector } from "./features/posts/postSlice";
import Graph from "./components/Graph/Graph";
import usePagination from "./components/PaginatedItems/Pagination";
import { ListItem } from "./components/ListItem/ListItem";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getAllWords, sortData } from "./utils/helpers";
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

  const handleChange = (_: any, p: number) => {
    setPage(p);
    postData.jump(p);
  };

  const allWords = getAllWords(posts);
  const occurrences: GraphData = allWords.reduce(function (
    acc: GraphData,
    currentValue
  ) {
    return (
      acc[currentValue] ? ++acc[currentValue] : (acc[currentValue] = 1), acc
    );
  },
  {});

  const sortable = sortData(occurrences);
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
          total={allWords.length}
        />
      </div>

      <div className="mb-8">
        {postData.currentData().map((post, index) => {
          return (
            <ListItem
              data-testid={`list-item-${post.id}`}
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
