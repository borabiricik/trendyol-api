import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/Favorites.entity';
import { User } from '../user/entities/User.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Product])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
