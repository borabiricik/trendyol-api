import {
  ArrayNotEmpty,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';
import { Merchant } from 'src/modules/merchant/entities/merchant.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @ArrayNotEmpty()
  categories: Category[];

  @IsNotEmpty()
  merchant_id: number;
}
