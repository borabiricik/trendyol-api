import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { AddToBasketDto } from './dtos/basket.dto';
import { User } from '../user/entities/User.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getBasket(email: string) {
    return await this.basketRepository.find({
      where: { user: { email } },
      relations: { product: true },
    });
  }

  async addToBasket(body: AddToBasketDto, email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    const product = await this.productRepository.findOne({
      where: { id: body.product_id },
    });
    const foundBasketItem = await this.basketRepository.findOne({
      where: { product, user },
    });
    if (foundBasketItem) {
      foundBasketItem.quantity++;
      return await this.basketRepository.save(foundBasketItem);
    }
    return await this.basketRepository.save({ user, product });
  }

  async decrease(body: AddToBasketDto, email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    const product = await this.productRepository.findOne({
      where: { id: body.product_id },
    });
    const foundBasketItem = await this.basketRepository.findOne({
      where: { product, user },
    });
    if (foundBasketItem) {
      foundBasketItem.quantity--;
      if (foundBasketItem.quantity === 0) {
        return await this.basketRepository.delete({ id: foundBasketItem.id });
      }
      return await this.basketRepository.save(foundBasketItem);
    }
    return await this.basketRepository.save({ user, product });
  }

  async remoteItem(basketItemId: string) {
    return await this.basketRepository.delete({ id: basketItemId });
  }
}
