import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { Merchant } from './entities/merchant.entity';
import { CreateMerchantDto } from './dtos/merchant.dto';

@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) {}
  @Get()
  async getAll(): Promise<Merchant[]> {
    return this.merchantService.getAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Merchant> {
    return this.merchantService.getById(params.id);
  }

  @Post()
  async create(@Body() merchant: CreateMerchantDto): Promise<Merchant> {
    return await this.merchantService.create(merchant);
  }

  @Put(':id')
  async update(@Param() params, @Body() merchant: Merchant): Promise<Merchant> {
    if ((await this.merchantService.update(params.id, merchant)).affected > 0) {
      return this.merchantService.getById(params.id);
    } else {
      return null;
    }
  }
}
