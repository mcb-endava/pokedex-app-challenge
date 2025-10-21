/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getPokemonList should return results on success', async () => {
    const mockData = { results: [{ name: 'pikachu', url: '…/1' }] };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await service.getPokemonList(20, 0);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/pokemon'),
      {
        params: { limit: 20, offset: 0 },
      },
    );
  });

  it('getPokemonByName should return data when found', async () => {
    const mockDetail = {
      name: 'pikachu',
      id: 25,
      sprites: { front_default: '…/pikachu.png' },
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockDetail });

    const result = await service.getPokemonByName('pikachu');
    expect(result).toEqual(mockDetail);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/pokemon/pikachu'),
    );
  });

  it('getPokemonByName should throw on error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(service.getPokemonByName('unknown')).rejects.toThrow(
      'API Error',
    );
  });
});
