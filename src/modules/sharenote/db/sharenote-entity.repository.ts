import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Sharenote } from '../Sharenote';
import { SharenoteSchema } from './sharenote-schema';
import { SharenoteSchemaFactory } from './sharenote-schema.factory';

@Injectable()
export class SharenoteEntityRepository extends BaseEntityRepository<SharenoteSchema, Sharenote> {
  constructor(
    @InjectModel(SharenoteSchema.name) private readonly sharenoteModel: Model<SharenoteSchema>,
    private readonly sharenoteSchemaFactory: SharenoteSchemaFactory,
  ) {
    super(sharenoteModel, sharenoteSchemaFactory);
  }
  async findById(id: string): Promise<Sharenote[]> {
    const documentSharenote = await this.sharenoteModel.find({ userId: id }, {}, { lean: true });
    const list = [];
    documentSharenote.forEach((document) => {
      list.push(this.sharenoteSchemaFactory.createFromSchema(document));
    });
    return list;
  }
}
