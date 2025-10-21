import { usePokemonStore } from "../pokemonStore";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

vi.mock("../../services/api", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("pokemonStore", () => {
  it("fetches and sets favorites", async () => {
    const { fetchFavorites } = usePokemonStore.getState();
    await act(async () => {
      await fetchFavorites();
    });
    expect(usePokemonStore.getState().favorites).toEqual([]);
  });
});
