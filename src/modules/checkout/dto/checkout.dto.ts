import { IsNotEmpty } from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  month: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  cvv: string;
}
