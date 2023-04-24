import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/product.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async create(@Body() product: CreateProductDto) {
    return await this.productService.create(product);
  }

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }
}
