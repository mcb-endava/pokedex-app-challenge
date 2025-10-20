import { create } from "zustand";
import api from "../services/api";

export interface FavoritePokemon {
  id: number;
  name: string;
}

interface PokemonStore {
  favorites: FavoritePokemon[];
  loading: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (pokemon: FavoritePokemon) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  favorites: [],
  loading: false,

  fetchFavorites: async () => {
    set({ loading: true });
    const res = await api.get("/favorites");
    set({ favorites: res.data, loading: false });
  },

  toggleFavorite: async (pokemon) => {
    const isExistingFavorite = get().favorites.some((p) => p.id === pokemon.id);
    if (isExistingFavorite) {
      await api.delete(`/favorites/${pokemon.id}`);
    } else {
      await api.post("/favorites", pokemon);
    }
    const res = await api.get("/favorites");
    set({ favorites: res.data });
  },

  isFavorite: (id) => get().favorites.some((p) => p.id === id),
}));
