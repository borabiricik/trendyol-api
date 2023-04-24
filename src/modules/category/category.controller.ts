import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(@Body() category): Promise<Category> {
    return await this.categoryService.create(category);
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Delete(':id')
  async delete(@Param() params) {
    const deleted = await this.categoryService.delete(params.id);
    if (deleted) return deleted;
    else throw new NotFoundException('Category');
  }
}
