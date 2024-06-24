import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { Products, ProductsDocument } from 'src/models';

@Injectable()
export class ProductService {
  @InjectModel(Products.name)
  private ProductsDocumentModel: Model<ProductsDocument>;
  @InjectModel(Products.name)
  private ProductssDocumentModelpag: PaginateModel<ProductsDocument>;

  async create(DocumentData: any): Promise<any> {
    try {
      let createUser = await this.ProductsDocumentModel.create(DocumentData);

      return createUser;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(payload: any, paginationQuery: any): Promise<any> {
    return await this.ProductssDocumentModelpag.paginate(
      payload,
      paginationQuery,
    );
  }
  async find(payload: any): Promise<any> {
    return await this.ProductsDocumentModel.find(payload);
  }
  async findOne(payload: {}): Promise<any> {
    let user: any;
    user = await this.ProductsDocumentModel.findOne(payload);

    return user;
  }
  async findUserbyEmailorId(payload: {}): Promise<any> {
    let user: any;
    user = await this.ProductsDocumentModel.findOne(payload).collation({
      strength: 2,
      locale: 'en',
    });
    return user;
  }

  async update(id: any, payload: {}): Promise<any> {
    let user: any;
    user = await this.ProductsDocumentModel.findByIdAndUpdate(id, payload);
    return user;
  }
  async findByid(id: any): Promise<any> {
    let user: any;
    user = await this.ProductsDocumentModel.findById(id).collation({
      strength: 2,
      locale: 'en',
    });
    return user;
  }

  async delete(id: any): Promise<any> {
    let user: any;
    user = await this.ProductsDocumentModel.findByIdAndDelete(id);
    return user;
  }
}
