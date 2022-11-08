import React from "react";
import { Post } from "../../types";

export function ListItem({ listItem }: { listItem: Post }) {
  return (
    <div className="p-2 rounded bg-gray-100 mb-4">
      <h3 className="text-gray-900 font-bold">{listItem.title}</h3>
      <p className="text-black">{listItem.body}</p>
    </div>
  );
}
