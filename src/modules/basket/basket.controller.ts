import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { JwtPayload, decode } from 'jsonwebtoken';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}
  @Get()
  async getBasket(@Headers() headers) {
    return await this.basketService.getBasket(
      (decode(headers.authorization?.split(' ')[1]) as JwtPayload).email,
    );
  }

  @Post()
  async addToBasket(@Headers() headers, @Body() payload) {
    return await this.basketService.addToBasket(
      payload,
      (decode(headers.authorization?.split(' ')[1]) as JwtPayload).email,
    );
  }

  @Post('decrease')
  async decreaseItem(@Headers() headers, @Body() payload) {
    return await this.basketService.decrease(
      payload,
      (decode(headers.authorization?.split(' ')[1]) as JwtPayload).email,
    );
  }

  @Delete(':id')
  async removeItem(@Param('id') id) {
    return await this.basketService.remoteItem(id);
  }
}
