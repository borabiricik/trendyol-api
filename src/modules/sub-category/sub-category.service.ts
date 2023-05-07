import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { CreateSubCategory } from './dtos/sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateSubCategory) {
    const createdCategory = this.subCategoryRepository.create(category);
    createdCategory.category = await this.categoryRepository.findOneByOrFail({
      id: category.category_id.toString(),
    });
    return await this.subCategoryRepository.save(createdCategory);
  }

  async getOne(id: string) {
    return await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: { sub_categories: true },
    });
  }
}
