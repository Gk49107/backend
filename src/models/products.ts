import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

import * as paginate from 'mongoose-paginate-v2';
import { Shop } from './shop';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({ timestamps: true })
export class Products {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop_id: Shop;

  @Prop()
  product_name: String;
  @Prop()
  product_logo: String;

  @Prop()
  qty: Number;
  @Prop()
  product_price: Number;

  @Prop()
  discount: Number;

  @Prop()
  ratings: String;

  @Prop()
  reviews: [String];

  @Prop()
  size: Number;

  @Prop()
  category: String;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

ProductsSchema.plugin(paginate);
