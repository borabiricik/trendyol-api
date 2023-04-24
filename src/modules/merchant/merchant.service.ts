import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMerchantDto, UpdateMerchantDto } from './dtos/merchant.dto';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  getAll(): Promise<Merchant[]> {
    return this.merchantRepository.find({ relations: { products: true } });
  }

  getById(id: string): Promise<Merchant> {
    return this.merchantRepository.findOneBy({ id });
  }

  async create(merchant: CreateMerchantDto): Promise<Merchant> {
    return await this.merchantRepository.save(merchant);
  }

  update(id: string, merchant: UpdateMerchantDto) {
    return this.merchantRepository.update({ id }, merchant);
  }
}
