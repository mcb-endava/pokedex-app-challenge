import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [PokemonModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
