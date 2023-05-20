import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { CreateCategoryDto } from './dtos/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() category: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(category, file);
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async getDetailsById(@Param() params): Promise<Category> {
    return await this.categoryService.getDetailsById(params.id);
  }

  @Delete(':id')
  async delete(@Param() params) {
    const deleted = await this.categoryService.delete(params.id);
    if (deleted) return deleted;
    else throw new NotFoundException('Category');
  }
}
