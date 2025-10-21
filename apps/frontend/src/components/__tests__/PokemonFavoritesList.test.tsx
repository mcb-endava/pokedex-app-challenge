import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PokemonFavoritesList from "../pokemon/PokemonFavoritesList";
import { vi } from "vitest";

// Mock dependencies
const useNavigateMock = vi.fn();

const favsMock = [
  { id: 25, name: "pikachu" },
  { id: 1, name: "bulbasaur" },
];

const toggleFavoriteMock = vi.fn().mockResolvedValue(undefined);
const isFavoriteMock = vi.fn().mockReturnValue(false);
let favoritesMock: any[] = [];

vi.mock("../../store/pokemonStore", () => ({
  usePokemonStore: () => ({
    toggleFavorite: toggleFavoriteMock,
    isFavorite: isFavoriteMock,
    favorites: favoritesMock,
    loading: false,
    fetchFavorites: vi.fn(),
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("PokemonFavoritesList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    favoritesMock = [];
  });

  it("shows loading state initially", async () => {
    // Simulate loading by rendering and waiting for setTimeout
    render(<PokemonFavoritesList />);
    expect(screen.getByTestId("loading")).toHaveTextContent("Catching favorite Pokemons...");
    await waitFor(() => expect(screen.queryByTestId("loading")).not.toBeInTheDocument(), { timeout: 1100 });
  });

  it("shows empty state if no favorites", async () => {
    render(<PokemonFavoritesList />);
    await waitFor(() => expect(screen.getByTestId("empty")).toHaveTextContent("No favorite Pokémons found"), { timeout: 1100 });
  });

  it("renders favorite pokemon cards after loading", async () => {
    favoritesMock = favsMock;
    render(<PokemonFavoritesList />);
    await waitFor(() => expect(screen.queryByTestId("loading")).not.toBeInTheDocument(), { timeout: 1100 });
    const cards = screen.getAllByTestId("pokemon-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByAltText("Pikachu")).toHaveAttribute("src", expect.stringContaining("/25.png"));
    expect(screen.getByAltText("Bulbasaur")).toHaveAttribute("src", expect.stringContaining("/1.png"));
  });

  it("navigates to pokemon details on card click", async () => {
    favoritesMock = favsMock;
    render(<PokemonFavoritesList />);
    await waitFor(() => expect(screen.queryByTestId("loading")).not.toBeInTheDocument(), { timeout: 1100 });
    const pikachuCard = screen.getAllByTestId("pokemon-card")[0];
    fireEvent.click(pikachuCard);
    expect(useNavigateMock).toHaveBeenCalledWith("/pokemon/pikachu");
  });
});