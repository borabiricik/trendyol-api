import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5)
  categories: Category[];
}
