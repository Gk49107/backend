import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

import * as paginate from 'mongoose-paginate-v2';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ timestamps: true })
export class Shop {
  @Prop()
  shop_name: String;
  @Prop()
  shop_desc: String;
  @Prop()
  ratings: String;
  @Prop({
    type: {
      type: String,
      enum: ['Point', 'Polygon'],
    },
    coordinates: [Number],
  })
  location: String;
  @Prop()
  location_string: String;
  @Prop()
  address: String;
  @Prop()
  shop_logo: String;
  @Prop()
  reviews: [String];
  @Prop()
  shop_temp: String;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

// add pagination plugin
ShopSchema.plugin(paginate);
