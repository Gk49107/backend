import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ProductService } from './product.service';
import { DefaultMessage, ResponseStatus } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { CommonInterceptor } from 'src/utils/common.interceptor';
import { ShopAddDTO } from './dto/add.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}
  async updateShop(product_id, body, profile?) {
    let payload: any = { ...body };
    let shops: any = [];
    let shopPayload = { _id: product_id };
    shops = await this.ProductService.findByid(product_id);
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

    shops = await this.ProductService.update(shopPayload, payload);

    return shops;
  }
  @Post()
  @UseInterceptors(FileInterceptor('product_logo', multerConfig))
  async post(@Body() body: ShopAddDTO, @UploadedFile() product_logo) {
    let payload = { ...body };
    if (product_logo) {
      let forwardSlashesPath = product_logo.path.replace(/\\/g, '/');
      payload.product_logo = forwardSlashesPath;
    }
    Response = await this.ProductService.create(payload);

    return {
      type: 'success',
      data: { data: Response },
    };
  }

  @Get('/shop/:shop_id')
  @UseInterceptors(new CommonInterceptor(new JwtService()))
  async getbyshop(@Param('shop_id') shop_id, @Query() query) {
    try {
      let shop = await this.ProductService.find({
        shop_id: shop_id,
        category: query.category,
      });
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

  @Get('/:product_id')
  @UseInterceptors(new CommonInterceptor(new JwtService()))
  async getOne(@Param('product_id') product_id) {
    try {
      let shop = await this.ProductService.findOne({ id: product_id });
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

  @Put(':product_id')
  @UseInterceptors(
    new CommonInterceptor(new JwtService()),
    FileInterceptor('shop_logo', multerConfig),
  )
  async put(
    @Body() body,
    @Param('product_id') product_id,
    @UploadedFile() shop_logo: any,
  ) {
    let payload = { ...body };

    let requestsid: string = product_id;

    try {
      let Shop = await this.updateShop(requestsid, payload, shop_logo);

      return {
        type: 'success',
        data: { data: Shop },
      };
    } catch {
      throw new HttpException(
        DefaultMessage.NOT_EXISTS,
        ResponseStatus.BAD_REQUEST,
      );
    }
  }

  @Delete()
  @UseInterceptors(new CommonInterceptor(new JwtService()))
  async delete(@Param('product_id') product_id: string) {
    await this.ProductService.delete(product_id);
    return {
      type: 'success',
      data: { message: 'Shop Deleted Successfully' },
    };
  }
}
