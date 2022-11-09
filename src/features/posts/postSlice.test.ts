import reducer, {
  getPostsLoading,
  getPostsSuccess,
  getPostsFailure,
} from "./postSlice";

const postOne = { id: 1, userId: 2, title: "One", body: "Body" };

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    posts: [],
    isLoading: false,
    error: null,
  });
});

test("should handle a loading state", () => {
  const previousState = {
    isLoading: false,
    error: null,
    posts: [],
  };

  expect(reducer(previousState, getPostsLoading(true))).toEqual({
    isLoading: true,
    error: null,
    posts: [],
  });
});

test("should handle a success state", () => {
  const previousState = {
    isLoading: false,
    error: null,
    posts: [postOne],
  };

  expect(reducer(previousState, getPostsSuccess([postOne]))).toEqual({
    isLoading: false,
    error: null,
    posts: [postOne],
  });
});

test("should handle a failure state", () => {
  const previousState = {
    isLoading: false,
    error: null,
    posts: [],
  };

  expect(reducer(previousState, getPostsFailure("Oops"))).toEqual({
    isLoading: false,
    error: "Oops",
    posts: [],
  });
});
