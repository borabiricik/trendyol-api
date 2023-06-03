import { IsNotEmpty } from 'class-validator';

export class AddToFavoritesDto {
  @IsNotEmpty()
  product_id: string;
}
