import React from "react";
import { Post } from "../../types";

export function ListItem({
  listItem,
  onClick,
}: {
  listItem: Post;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col p-4 rounded bg-gray-100 mb-4">
      <button
        type="button"
        id="deleteButton"
        className="ml-auto bg-red-600 w-8 h-8 rounded-md text-white text-xl"
        onClick={onClick}
      >
        X
      </button>
      <h3 className="text-xl text-gray-900 font-bold">{listItem.title}</h3>
      <p className="text-black mb-4">{listItem.body}</p>
    </div>
  );
}
