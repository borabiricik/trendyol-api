import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategory } from './dtos/sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Post()
  async create(@Body() subCategory: CreateSubCategory) {
    return this.subCategoryService.create(subCategory);
  }

  @Get(':id')
  async getOne(@Param() params) {
    return await this.subCategoryService.getOne(params.id);
  }
}
