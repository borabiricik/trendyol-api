import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Merchant } from '../merchant/entities/merchant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Merchant])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
