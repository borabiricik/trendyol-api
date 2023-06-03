import { IsNotEmpty } from 'class-validator';

export class AddToBasketDto {
  @IsNotEmpty()
  product_id: string;
}
