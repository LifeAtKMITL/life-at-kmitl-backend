import { SchemaFactory } from '@nestjs/mongoose';
import { DormReviewSchema } from './dormReview-schema';
import { DormReview } from './../DormReview';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Dorm } from '../Dorm';
import { DormSchema } from './dorm-schema';

@Injectable()
export class DormReviewSchemaFactory implements EntitySchemaFactory<DormReviewSchema, DormReview> {
  create(dormReview: DormReview): DormReviewSchema {
    return {
      _id: new mongoose.Types.ObjectId(dormReview.getId()),
      dormId: dormReview.getDorm_Id(),
      userId: dormReview.getUserId(),
      textReview: dormReview.getTextReview(),
    };
  }

  createFromSchema(dormReviewSchema: DormReviewSchema): DormReview {
    return new DormReview(
      dormReviewSchema._id.toString(),
      dormReviewSchema.dormId,
      dormReviewSchema.userId,
      dormReviewSchema.textReview,
    );
  }
}
