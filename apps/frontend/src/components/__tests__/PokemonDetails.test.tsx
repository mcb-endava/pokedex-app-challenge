import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PokemonDetailPage from "../pokemon/PokemonDetails";
import { vi } from "vitest";
import { pikachuMock } from "../../mocks/pokemon.mock";
import * as api from "../../services/api";

// Mock dependencies
vi.mock("../../services/api", () => ({
    getPokemonDetails: vi.fn(),
    getPokemonList: vi.fn(),
    default: { get: vi.fn() },
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<any>("react-router-dom");
    return {
        ...actual,
        useParams: () => ({ name: "pikachu" }),
        Link: ({ to, children }: any) => <a href={to}>{children}</a>,
    };
});

const toggleFavoriteMock = vi.fn().mockResolvedValue(undefined);
const isFavoriteMock = vi.fn().mockReturnValue(false);
const favoritesMock = vi.fn().mockReturnValue([]);

vi.mock("../../store/pokemonStore", () => ({
    usePokemonStore: () => ({
        toggleFavorite: toggleFavoriteMock,
        isFavorite: isFavoriteMock,
        favorites: favoritesMock,
        loading: false,
        fetchFavorites: vi.fn(),
    }),
}));


describe("PokemonDetailsComponent", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows loading state initially", async () => {
        (api.getPokemonDetails as any).mockResolvedValue(new Promise(() => { }));
        render(<PokemonDetailPage />);
        await waitFor(() =>
            expect(screen.getByTestId("loading")).toHaveTextContent("Loading Pokémon details...")
        );
    });
    
    it("shows empty state if no pokemon found", async () => {
        (api.getPokemonDetails as any).mockResolvedValue(null);
        render(<PokemonDetailPage />);
        await waitFor(() =>
            expect(screen.getByTestId("empty")).toHaveTextContent("No Pokémon found")
        );
    });


    it("renders pokemon details after fetch", async () => {
        (api.getPokemonDetails as any).mockResolvedValue(pikachuMock);
        render(<PokemonDetailPage />);
        expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
        expect(screen.getByText(/Height:/)).toHaveTextContent("Height: 4");
        expect(screen.getByText(/Weight:/)).toHaveTextContent("Weight: 60");
        expect(screen.getByText("electric")).toBeInTheDocument();
        expect(screen.getByText("static")).toBeInTheDocument();
        expect(screen.getByText("lightning-rod")).toBeInTheDocument();
        expect(screen.getByText("Speed")).toBeInTheDocument();
        expect(screen.getByText("Attack")).toBeInTheDocument();
    });

    it("toggles favorite and shows snackbar", async () => {
        (api.getPokemonDetails as any).mockResolvedValue(pikachuMock);
        isFavoriteMock.mockReturnValue(false);
        render(<PokemonDetailPage />);
        const favoriteBtn = await screen.findByLabelText("favorite");
        fireEvent.click(favoriteBtn);
        await waitFor(() => expect(toggleFavoriteMock).toHaveBeenCalledWith({ id: 25, name: "pikachu" }));
        expect(screen.getByText("Pikachu added to favorites!")).toBeInTheDocument();
    });

    it("shows removed from favorites snackbar", async () => {
        (api.getPokemonDetails as any).mockResolvedValue(pikachuMock);
        isFavoriteMock.mockReturnValue(true);
        favoritesMock.mockReturnValue([{ id: 25, name: "pikachu" }]);
        render(<PokemonDetailPage />);
        const favoriteBtn = await screen.findByLabelText("favorite");
        fireEvent.click(favoriteBtn);
        await waitFor(() => expect(toggleFavoriteMock).toHaveBeenCalled());
    });

    it("back button links to home", async () => {
        (api.getPokemonDetails as any).mockResolvedValue(pikachuMock);
        render(<PokemonDetailPage />);
        const backBtn = await screen.findByText(/← Back/);
        expect(backBtn.closest("a")).toHaveAttribute("href", "/");
    });

    it("shows empty state on API error", async () => {
        (api.getPokemonDetails as any).mockRejectedValue(new Error("API error"));
        render(<PokemonDetailPage />);
        await waitFor(() => expect(screen.getByTestId("empty")).toHaveTextContent("No Pokémon found"));
    });
});