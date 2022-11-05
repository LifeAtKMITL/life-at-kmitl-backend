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
      userId: sharenote.getUserId(),
      userName: sharenote.getUserName(),
      sharenoteCollectionName: sharenote.getSharenoteCollectionName(),
      sharenoteCollectionNameVersion: sharenote.getSharenoteCollectionNameVersion(),
      files: sharenote.getFiles(),
      likeCount: sharenote.getLikeCount(),
      dowloadCount: sharenote.getDowloadCount(),
      teachers: sharenote.getTeachers(),
      date: sharenote.getDate(),
    };
  }

  createFromSchema(sharenoteSchema: SharenoteSchema): Sharenote {
    return new Sharenote(
      sharenoteSchema._id.toString(),
      sharenoteSchema.userId,
      sharenoteSchema.userName,
      sharenoteSchema.sharenoteCollectionName,
      sharenoteSchema.sharenoteCollectionNameVersion,
      sharenoteSchema.files,
      sharenoteSchema.likeCount,
      sharenoteSchema.dowloadCount,
      sharenoteSchema.teachers,
      sharenoteSchema.date,
    );
  }
}
