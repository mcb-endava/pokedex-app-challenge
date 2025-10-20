import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // GET /pokemon?limit=20&offset=0
  @Get()
  async getPokemonList(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ) {
    return this.pokemonService.getPokemonList(+limit, +offset);
  }

  // GET /pokemon/pikachu
  @Get(':name')
  async getPokemon(@Param('name') name: string) {
    return this.pokemonService.getPokemonByName(name);
  }
}