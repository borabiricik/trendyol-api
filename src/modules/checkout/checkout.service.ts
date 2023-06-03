import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
} from 'creditcard.js';

@Injectable()
export class CheckoutService {
  validate(body: CheckoutDto) {
    if (!isValid(body.card_number)) {
      throw new BadRequestException('Bad Credit Card Number');
    } else if (!isExpirationDateValid(body.month, body.year)) {
      throw new BadRequestException('Bad Expiration Date');
    } else if (!isSecurityCodeValid(body.card_number, body.cvv)) {
      throw new BadRequestException('Bad CVV');
    } else {
      return {
        message: 'Success',
      };
    }
  }
}
