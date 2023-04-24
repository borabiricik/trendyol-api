import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(product: CreateProductDto) {
    const createdProduct = this.productRepository.create(product);
    createdProduct.categories = await this.categoryRepository.findBy({
      id: In(product.categories),
    });
    return await this.productRepository.save(createdProduct);
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { categories: true },
    });
  }
}
