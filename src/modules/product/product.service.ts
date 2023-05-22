import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Merchant } from '../merchant/entities/merchant.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  async create(product: CreateProductDto) {
    const createdProduct = this.productRepository.create(product);
    createdProduct.categories = await this.categoryRepository.findBy({
      id: In(product.categories),
    });
    createdProduct.merchant = await this.merchantRepository.findOneByOrFail({
      id: product.merchant_id.toString(),
    });
    return await this.productRepository.save(createdProduct);
  }

  async getAll(filter: string): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { categories: true, merchant: true },
      where: {
        name: (filter && ILike(`%${filter}%`)) || undefined,
      },
    });
  }
}
