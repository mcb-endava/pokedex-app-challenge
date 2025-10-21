import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PokemonList from "../pokemon/PokemonList";
import { vi } from "vitest";
import * as api from "../../services/api";

const pokemonsMock = [
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
];

const useNavigateMock = vi.fn();

vi.mock("../../services/api", () => ({
  getPokemonList: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("PokemonList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", async () => {
    (api.getPokemonList as any).mockResolvedValue(new Promise(() => {}));
    render(<PokemonList />);
    expect(screen.getByTestId("loading")).toHaveTextContent("Catching all Pokemons...");
  });

  it("shows empty state if no pokemons found", async () => {
    (api.getPokemonList as any).mockResolvedValue([]);
    render(<PokemonList />);
    await waitFor(() => expect(screen.getByTestId("empty")).toHaveTextContent("No Pokémons found"));
  });

  it("renders pokemon cards after fetch", async () => {
    (api.getPokemonList as any).mockResolvedValue(pokemonsMock);
    render(<PokemonList />);
    await waitFor(() => expect(screen.queryByTestId("loading")).not.toBeInTheDocument());
    const cards = screen.getAllByTestId("pokemon-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByAltText("Pikachu")).toHaveAttribute("src", expect.stringContaining("/25.png"));
    expect(screen.getByAltText("Bulbasaur")).toHaveAttribute("src", expect.stringContaining("/1.png"));
  });

  it("filters pokemons by search input", async () => {
    (api.getPokemonList as any).mockResolvedValue(pokemonsMock);
    render(<PokemonList />);
    await waitFor(() => expect(screen.queryByTestId("loading")).not.toBeInTheDocument());
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "bulba" } });
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
  });

  it("navigates to pokemon details on card click", async () => {
    (api.getPokemonList as any).mockResolvedValue(pokemonsMock);
    render(<PokemonList />);
    await waitFor(() => expect(screen.queryByTestId("loading")).not.toBeInTheDocument());
    const pikachuCard = screen.getAllByTestId("pokemon-card")[0];
    fireEvent.click(pikachuCard);
    expect(useNavigateMock).toHaveBeenCalledWith("/pokemon/pikachu");
  });

  it("shows empty state on API error", async () => {
    (api.getPokemonList as any).mockRejectedValue(new Error("API error"));
    render(<PokemonList />);
    await waitFor(() => expect(screen.getByTestId("empty")).toHaveTextContent("No Pokémons found"));
  });
});