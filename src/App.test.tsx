import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "./utils/test-utils";
import App from "./App";

const postOne = { id: 1, userId: 2, title: "One", body: "Body One\nThree" };
const postTwo = { id: 2, userId: 3, title: "Two", body: "Body Two" };

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    return res(ctx.json([postOne, postTwo]), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

jest.mock("@material-ui/lab");

describe("App", () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("renders app with correct number of words", async () => {
    renderWithProviders(<App />);
    expect(screen.getByText("Loading posts ...")).toBeInTheDocument();

    await waitFor(() => [
      expect(screen.getByText("Top Five Frequent Words")).toBeInTheDocument(),
      expect(screen.getByText(/Total Words Count: 5/)).toBeInTheDocument(),
    ]);
  });
});
