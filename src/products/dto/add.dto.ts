import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ShopAddDTO {
  @IsOptional()
  shop_id: String;
  @IsOptional()
  product_name: String;
  @IsOptional()
  product_logo: String;

  @IsOptional()
  qty: Number;
  @IsOptional()
  product_price: Number;

  @IsOptional()
  discount: Number;

  @IsOptional()
  ratings: String;

  @IsOptional()
  reviews: [String];

  @IsOptional()
  size: Number;

  @IsOptional()
  category: String;
}
