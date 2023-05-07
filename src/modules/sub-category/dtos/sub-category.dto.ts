import { IsNotEmpty } from 'class-validator';

export class CreateSubCategory {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category_id: number;
}
