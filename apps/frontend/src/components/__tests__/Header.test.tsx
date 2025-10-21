import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header component", () => {

  it("renders Header with navigation buttons", () => {
    render(<Header />);
    expect(screen.getByText("Pokédex")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Favorites" })).toBeInTheDocument();
  });

});