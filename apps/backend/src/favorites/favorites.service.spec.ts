import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    service = new FavoritesService();
  });

  it('should start with an empty list', () => {
    expect(service.getFavorites()).toEqual([]);
  });

  it('should add a favorite', () => {
    service.addFavorite({ id: 25, name: 'pikachu' });
    expect(service.getFavorites()).toEqual([{ id: 25, name: 'pikachu' }]);
  });

  it('should remove a favorite', () => {
    service.addFavorite({ id: 25, name: 'pikachu' });
    service.removeFavorite(25);
    expect(service.getFavorites()).toEqual([]);
  });

  it('should not duplicate favorites', () => {
    service.addFavorite({ id: 25, name: 'pikachu' });
    service.addFavorite({ id: 25, name: 'pikachu' });
    expect(service.getFavorites().length).toBe(1);
  });
});
