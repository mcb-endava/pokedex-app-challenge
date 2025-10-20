import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoritesService, FavoritePokemon } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): FavoritePokemon[] {
    return this.favoritesService.getFavorites();
  }

  @Post()
  addFavorite(@Body() body: { id: number; name: string }) {
    return this.favoritesService.addFavorite(body);
  }

  @Delete(':id')
  removeFavorite(@Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.removeFavorite(id);
  }
}
