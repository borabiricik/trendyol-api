import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '../common/exceptions/not-found.exception';

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

  async getDetailsById(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { id },
        relations: { products: true },
      });
    } catch (error) {
      throw new NotFoundException('Category');
    }
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
