import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {
  private readonly API_BASE = 'https://pokeapi.co/api/v2';

  async getPokemonList(limit = 20, offset = 0) {
    const response = await axios.get(`${this.API_BASE}/pokemon`, {
      params: { limit, offset },
    });
    return response.data;
  }

  async getPokemonByName(name: string) {
    const response = await axios.get(`${this.API_BASE}/pokemon/${name}`);
    return response.data;
  }
}