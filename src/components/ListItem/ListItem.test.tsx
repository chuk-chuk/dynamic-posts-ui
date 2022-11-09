import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListItem } from "./ListItem";

const mockPost = {
  id: 1,
  userId: 1,
  title: "One",
  body: "Text",
};
const mockOnClick = jest.fn();

describe("ListItem", () => {
  it("renders a component with a title and a body", () => {
    render(<ListItem listItem={mockPost} onClick={mockOnClick} />);
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
  });

  it("calls onClick when delete button is clicked", () => {
    render(<ListItem listItem={mockPost} onClick={mockOnClick} />);
    userEvent.click(screen.getByText("X"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
