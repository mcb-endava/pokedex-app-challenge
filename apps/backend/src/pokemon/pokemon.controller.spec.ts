/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  const mockService = {
    getPokemonList: jest.fn(),
    getPokemonByName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPokemonList', () => {
    it('should return the list of Pokémon', async () => {
      const mockResult = { results: [{ name: 'bulbasaur' }] };
      mockService.getPokemonList.mockResolvedValueOnce(mockResult);

      const result = await controller.getPokemonList(10, 0);

      expect(result).toEqual(mockResult);
      expect(service.getPokemonList).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('getPokemonByName', () => {
    it('should return details for a Pokémon by name', async () => {
      const mockPokemon = { name: 'pikachu', id: 25 };
      mockService.getPokemonByName.mockResolvedValueOnce(mockPokemon);

      const result = await controller.getPokemon('pikachu');

      expect(result).toEqual(mockPokemon);
      expect(service.getPokemonByName).toHaveBeenCalledWith('pikachu');
    });
  });
});
