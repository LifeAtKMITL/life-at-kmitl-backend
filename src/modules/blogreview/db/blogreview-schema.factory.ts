import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Blogreview } from '../Blogreview';
import { BlogreviewSchema } from './blogreview-schema';

@Injectable()
export class BlogreviewSchemaFactory implements EntitySchemaFactory<BlogreviewSchema, Blogreview> {
  create(blogreview: Blogreview): BlogreviewSchema {
    return {
      _id: new mongoose.Types.ObjectId(blogreview.getId()),
      subjectId: blogreview.getSubjectId(),
      subjectName: blogreview.getSubjectName(),
      textSubjectReview: blogreview.getTextSubjectReview(),
      userId: blogreview.getUserId(),
      likeCount: blogreview.getLikeCount(),
      date: blogreview.getDate(),
    };
  }

  createFromSchema(BlogreviewSchema: BlogreviewSchema): Blogreview {
    return new Blogreview(
      BlogreviewSchema._id.toString(),
      BlogreviewSchema.subjectId,
      BlogreviewSchema.subjectName,
      BlogreviewSchema.textSubjectReview,
      BlogreviewSchema.userId,
      BlogreviewSchema.likeCount,
      BlogreviewSchema.date,
    );
  }
}
