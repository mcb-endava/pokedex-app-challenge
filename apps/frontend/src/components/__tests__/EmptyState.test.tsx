import { render, screen } from "@testing-library/react";
import EmptyListState from "../EmptyState";

describe("Empty State component", () => {
  it("renders EmptyListState with text", () => {
    render(<EmptyListState text="No Pokémon found" />);
    expect(screen.getByTestId("empty")).toBeInTheDocument();
    expect(screen.getByText("No Pokémon found")).toBeInTheDocument();
    expect(screen.getByAltText("Sad pikachu")).toBeInTheDocument();
  });
});