import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

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
