import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [FavoritesService],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should add and retrieve favorites', () => {
    controller.addFavorite({ id: 25, name: 'pikachu' });
    const favorites = controller.getFavorites();
    expect(favorites).toEqual([{ id: 25, name: 'pikachu' }]);
  });

  it('should remove a favorite', () => {
    controller.addFavorite({ id: 25, name: 'pikachu' });
    controller.removeFavorite(25);
    expect(service.getFavorites()).toEqual([]);
  });
});
