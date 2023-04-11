import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  getAll(): Promise<Merchant[]> {
    return this.merchantRepository.find();
  }
}
