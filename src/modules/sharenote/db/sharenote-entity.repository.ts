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
    @InjectModel(SharenoteSchema.name) sharenoteModel: Model<SharenoteSchema>,
    sharenoteSchemaFactory: SharenoteSchemaFactory,
  ) {
    super(sharenoteModel, sharenoteSchemaFactory);
  }
}
