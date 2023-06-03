import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, Product, User])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
