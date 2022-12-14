import { DormReviewSchema } from './dormReview-schema';
import { DormReview } from '../DormReview';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { BaseEntityRepository } from 'src/database/base-entity.repository';

import { FilterQuery, Model, Types } from 'mongoose';
import { DormReviewSchemaFactory } from './dormReview-schema.factory';

@Injectable()
export class DormReviewEntityRepository extends BaseEntityRepository<DormReviewSchema, DormReview> {
  constructor(
    @InjectModel(DormReviewSchema.name) private readonly dormReviewModel: Model<DormReviewSchema>,
    private readonly dormReviewSchemaFactory: DormReviewSchemaFactory,
  ) {
    super(dormReviewModel, dormReviewSchemaFactory);
  }

  //async find function here
  async findAllById(id: string): Promise<DormReview[]> {
    const documentReviews = await this.dormReviewModel.find({ dormId: id }, {}, {
      lean: true,
    } as FilterQuery<DormReviewSchema>);

    const list = [];
    documentReviews.forEach((document) => {
      list.push(this.dormReviewSchemaFactory.createFromSchema(document));
    });
    return list;
  }
}
