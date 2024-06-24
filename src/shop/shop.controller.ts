import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';
import { ShopService } from './shop.service';
import { DefaultMessage, ResponseStatus } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { CommonInterceptor } from 'src/utils/common.interceptor';
import { ShopAddDTO } from './dto/add.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly ShopService: ShopService) {}
  async updateShop(shop_id, body, profile?) {
    let payload: any = { ...body };
    let shops: any = [];
    let shopPayload = { _id: shop_id };
    shops = await this.ShopService.findByid(shop_id);
    if (!shops) {
      throw new HttpException(
        DefaultMessage.NOT_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
    if (profile) {
      let forwardSlashesPath = profile.path.replace(/\\/g, '/');
      payload.profile_picture = forwardSlashesPath;
    }

    shops = await this.ShopService.update(shopPayload, payload);

    return shops;
  }
  @Post()
  @UseInterceptors(FileInterceptor('shop_logo', multerConfig))
  async post(@Body() body: ShopAddDTO, @UploadedFile() shop_logo) {
    let payload = { ...body };
    if (shop_logo) {
      let forwardSlashesPath = shop_logo.path.replace(/\\/g, '/');
      payload.shop_logo = forwardSlashesPath;
    }
    Response = await this.ShopService.create(payload);

    return {
      type: 'success',
      data: { data: Response },
    };
  }
  @Post('/checkout')
  async postcheckout(@Body() body, @Req() req, @Headers() headers: Headers) {
    let payload = { ...body, currency: 'USD' };
    Response = await this.ShopService.checkout(payload, headers);

    return {
      type: 'success',
      data: { data: Response },
    };
  }
  @Get()
  // @UseInterceptors(new CommonInterceptor(new JwtService()))
  async getall(@Query() query) {
    try {
      let payload = {};
      if (query) {
        if (query.search) {
          payload = { shop_name: { $regex: query.search, $options: 'i' } };
        }
      }
      let shop = await this.ShopService.find(payload);
      return {
        type: 'success',
        data: { data: shop },
      };
    } catch {
      throw new HttpException(
        DefaultMessage.NOT_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
  }
  @Get('/:shop_id')
  // @UseInterceptors()
  async getOne(@Param('shop_id') shop_id) {
    try {
      let shop = await this.ShopService.findOne({ _id: shop_id });
      return {
        type: 'success',
        data: shop,
      };
    } catch {
      throw new HttpException(
        DefaultMessage.NOT_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':shop_id')
  @UseInterceptors(
    // new CommonInterceptor(new JwtService()),
    FileInterceptor('profile', multerConfig),
  )
  async put(
    @Body() body,
    @Param('shop_id') shop_id,
    @UploadedFile() profile: any,
  ) {
    let payload = { ...body };

    let requestsid: string = shop_id;

    try {
      let Shop = await this.updateShop(requestsid, payload, profile);

      return {
        type: 'success',
        data: Shop,
      };
    } catch {
      throw new HttpException(
        DefaultMessage.NOT_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
  }

  @Delete()
  // @UseInterceptors(new CommonInterceptor(new JwtService()))
  async delete(@Param('shop_id') shop_id: string) {
    await this.ShopService.delete(shop_id);
    return {
      type: 'success',
      data: { message: 'Shop Deleted Successfully' },
    };
  }
}
