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
      subjectID: blogreview.getSubjectId(),
      textSubjectReview: blogreview.getTextSubjectReview(),
      userID: blogreview.getUserId(),
      userName: blogreview.getUserName(),
      userID_Liked: blogreview.getUserId_Liked(),
      rate: blogreview.getRate(),
      date: blogreview.getDate(),
    };
  }

  createFromSchema(BlogreviewSchema: BlogreviewSchema): Blogreview {
    return new Blogreview(
      BlogreviewSchema._id.toString(),
      BlogreviewSchema.subjectID,
      BlogreviewSchema.textSubjectReview,
      BlogreviewSchema.userID,
      BlogreviewSchema.userName,
      BlogreviewSchema.userID_Liked,
      BlogreviewSchema.rate,
      BlogreviewSchema.date,
    );
  }
}
