import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post(':name')
  addFavorite(@Param('name') name: string) {
    return this.favoritesService.addFavorite(name);
  }

  @Delete(':name')
  removeFavorite(@Param('name') name: string) {
    return this.favoritesService.removeFavorite(name);
  }
}
