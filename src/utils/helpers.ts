import { Post } from "../types";

export const getAllWords = (inputData: Post[]) => {
  const itemBodies = inputData.map((item) => item.body).flat();
  const itemBodiesWithNewLines = itemBodies
    .map((body) => body.split(" "))
    .flat();
  return itemBodiesWithNewLines.map((body) => body.split(/\r?\n/)).flat();
};

export const sortData = (inputData: Record<string, number>) =>
  Object.fromEntries(
    Object.entries(inputData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  );
