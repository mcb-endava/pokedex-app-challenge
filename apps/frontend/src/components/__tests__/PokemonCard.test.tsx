import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonCard } from "../pokemon/PokemonCard";
import { usePokemonStore } from "../../store/pokemonStore";
import { vi } from "vitest";

vi.mock("../../store/pokemonStore", () => ({
  usePokemonStore: vi.fn(),
}));

describe("PokemonCard", () => {
  beforeEach(() => {
    (usePokemonStore as any).mockReturnValue({
      toggleFavorite: vi.fn(),
      isFavorite: () => false,
    });
  });

  it("renders the Pokémon name and image", () => {
    render(<PokemonCard name="pikachu" image="/pikachu.png" />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/pikachu.png");
  });
});
