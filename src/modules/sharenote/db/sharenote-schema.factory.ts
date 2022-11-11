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
      subjectId: sharenote.getSubjectId(),
      sharenoteCollectionName: sharenote.getSharenoteCollectionName(),
      sharenoteCollectionNameVersion: sharenote.getSharenoteCollectionNameVersion(),
      files: sharenote.getFiles(),
      likeCount: sharenote.getLikeCount(),
      viewCount: sharenote.getviewCount(),
      teachers: sharenote.getTeachers(),
      date: sharenote.getDate(),
      exam: sharenote.getExam(),
      year: sharenote.getYear(),
      description: sharenote.getDescription(),
    };
  }

  createFromSchema(sharenoteSchema: SharenoteSchema): Sharenote {
    return new Sharenote(
      sharenoteSchema._id.toString(),
      sharenoteSchema.userId,
      sharenoteSchema.subjectId,
      sharenoteSchema.sharenoteCollectionName,
      sharenoteSchema.sharenoteCollectionNameVersion,
      sharenoteSchema.files,
      sharenoteSchema.likeCount,
      sharenoteSchema.viewCount,
      sharenoteSchema.teachers,
      sharenoteSchema.date,
      sharenoteSchema.exam,
      sharenoteSchema.year,
      sharenoteSchema.description,
    );
  }
}
