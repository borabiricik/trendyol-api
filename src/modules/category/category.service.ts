import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async delete(id: string) {
    const foundCategory = await this.categoryRepository.findBy({ id });
    const data = await this.categoryRepository.delete(id);
    if (data.affected > 0 && foundCategory) {
      return foundCategory;
    } else {
      return null;
    }
  }
}
