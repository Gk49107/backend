import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';

import MailService from 'src/mail.config';
import { Shop, ShopSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
