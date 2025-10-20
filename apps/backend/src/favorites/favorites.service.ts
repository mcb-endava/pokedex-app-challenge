import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private favorites = new Set<string>(); // Set avoids duplicate names

  addFavorite(name: string) {
    this.favorites.add(name.toLowerCase());
    return Array.from(this.favorites);
  }

  removeFavorite(name: string) {
    this.favorites.delete(name.toLowerCase());
    return Array.from(this.favorites);
  }

  getFavorites() {
    return Array.from(this.favorites);
  }
}
