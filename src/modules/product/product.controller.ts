import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  async getAll(@Query() query?): Promise<Product[]> {
    return await this.productService.getAll(query.name);
  }
}
