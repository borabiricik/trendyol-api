import { Controller, Get } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { Merchant } from './entities/merchant.entity';

@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) {}
  @Get()
  async getAll(): Promise<Merchant[]> {
    return this.merchantService.getAll();
  }
}
