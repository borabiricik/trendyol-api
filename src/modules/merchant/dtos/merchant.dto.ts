import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMerchantDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc?: string;

  @IsOptional()
  picture?: string;
}

export class UpdateMerchantDto {
  @IsOptional()
  name: string;

  @IsOptional()
  desc?: string;

  @IsOptional()
  picture?: string;
}
