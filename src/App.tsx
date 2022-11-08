import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { addPost, deletePost, getPosts, Post } from "./store/post";
import "./index.css";

function App() {
  const data: {
    postData: {
      posts: Post[];
    };
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-2xl underline text-red-600">
        Posts: {data.postData.posts.length}
      </h2>
      <button
        aria-label="Add post"
        onClick={() =>
          dispatch(
            addPost({
              userId: 2,
              id: 3,
              title: "post 1 title",
              body: "post 1 desc",
            })
          )
        }
      >
        Add
      </button>
      <button aria-label="Get app posts" onClick={() => dispatch(getPosts())}>
        Get all
      </button>
      <button aria-label="Delete post" onClick={() => dispatch(deletePost(3))}>
        Delete
      </button>
    </div>
  );
}

export default App;
