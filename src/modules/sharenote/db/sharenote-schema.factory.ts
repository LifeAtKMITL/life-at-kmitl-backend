import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Sharenote } from '../Sharenote';
import { SharenoteSchema } from './sharenote-schema';

@Injectable()
export class SharenoteSchemaFactory implements EntitySchemaFactory<SharenoteSchema, Sharenote> {
  create(sharenote: Sharenote): SharenoteSchema {
    return {
      _id: new mongoose.Types.ObjectId(sharenote.getId()),
      name: sharenote.getName(),
      sec: sharenote.getSec(),
      credit: sharenote.getCredit(),
      teachers: sharenote.getTeachers(),
    };
  }

  createFromSchema(sharenoteSchema: SharenoteSchema): Sharenote {
    return new Sharenote(
      sharenoteSchema._id.toString(),
      sharenoteSchema.name,
      sharenoteSchema.sec,
      sharenoteSchema.credit,
      sharenoteSchema.teachers,
    );
  }
}
