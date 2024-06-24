import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ShopAddDTO {
  @IsOptional()
  shop_name: String;
  @IsOptional()
  shop_desc: String;
  @IsOptional()
  ratings: String;
  @IsOptional()
  location: String;
  @IsOptional()
  location_string: String;
  @IsOptional()
  address: String;
  @IsOptional()
  shop_logo: String;
  @IsOptional()
  reviews: String[];
  @IsOptional()
  shop_temp: String;
}
