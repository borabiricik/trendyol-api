import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/Favorites.entity';
import { AddToFavoritesDto } from './dtos/favorites.dto';
import { User } from '../user/entities/User.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getFavorites(email: string) {
    return await this.favoriteRepository.find({
      where: { user: { email } },
      relations: { product: true },
    });
  }

  async addtoFavorites(body: AddToFavoritesDto, email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    const product = await this.productRepository.findOne({
      where: { id: body.product_id },
    });
    return await this.favoriteRepository.save({ product, user });
  }

  async removeFromFavorites(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    return await this.favoriteRepository.delete({ product });
  }
}
