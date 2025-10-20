import { Injectable } from '@nestjs/common';

export interface FavoritePokemon {
  id: number;
  name: string;
}

@Injectable()
export class FavoritesService {
  private favorites: FavoritePokemon[] = [];

  getFavorites() {
    return this.favorites;
  }

  addFavorite(pokemon: FavoritePokemon) {
    // Avoid duplicates
    const exists = this.favorites.some((p) => p.id === pokemon.id);
    if (!exists) {
      this.favorites.push(pokemon);
    }
    return this.favorites;
  }

  removeFavorite(id: number) {
    this.favorites = this.favorites.filter((p) => p.id !== id);
    return this.favorites;
  }
}
