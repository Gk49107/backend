import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Stripe from 'stripe';
import { Model, PaginateModel } from 'mongoose';
import { Shop, ShopDocument } from 'src/models';

@Injectable()
export class ShopService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }
  @InjectModel(Shop.name)
  private ShopDocumentModel: Model<ShopDocument>;
  @InjectModel(Shop.name)
  private ShopsDocumentModelpag: PaginateModel<ShopDocument>;

  async create(DocumentData: any): Promise<any> {
    try {
      let createUser = await this.ShopDocumentModel.create(DocumentData);

      return createUser;
    } catch (err) {
      console.log(err);
    }
  }

  async checkout(DocumentData: any): Promise<any> {
    let sumAmount = 0;
    let lineitem = DocumentData.products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.product_name,
          image: [product.product_image],
        },
        unit_amount: product.product_price * 1,
      },
      quantity: 1,
    }));
    // console.log(sumAmount);
    // return this.stripe.paymentIntents.create({
    //   amount: sumAmount * 100,
    //   currency: DocumentData.currency,
    // });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      line_items: lineitem,
      mode: 'payment',
      success_url: 'http://127.0.0.1:3000/',
      cancel_url: 'http://127.0.0.1:3000/',
    });
    return session.id;
  }

  async findAll(payload: any, paginationQuery: any): Promise<any> {
    return await this.ShopsDocumentModelpag.paginate(payload, paginationQuery);
  }
  async find(payload: any): Promise<any> {
    return await this.ShopDocumentModel.find(payload);
  }
  async findOne(payload: {}): Promise<any> {
    let user: any;
    user = await this.ShopDocumentModel.findOne(payload);

    return user;
  }
  async findUserbyEmailorId(payload: {}): Promise<any> {
    let user: any;
    user = await this.ShopDocumentModel.findOne(payload).collation({
      strength: 2,
      locale: 'en',
    });
    return user;
  }

  async update(id: any, payload: {}): Promise<any> {
    let user: any;
    user = await this.ShopDocumentModel.findByIdAndUpdate(id, payload);
    return user;
  }
  async findByid(id: any): Promise<any> {
    let user: any;
    user = await this.ShopDocumentModel.findById(id).collation({
      strength: 2,
      locale: 'en',
    });
    return user;
  }

  async delete(id: any): Promise<any> {
    let user: any;
    user = await this.ShopDocumentModel.findByIdAndDelete(id);
    return user;
  }
}
