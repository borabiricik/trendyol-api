import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}
  @Post()
  checkout(@Body() body: CheckoutDto) {
    return this.checkoutService.validate(body);
  }
}
