import { CreateDormReviewDto } from './dtos/command/create-dormReview';
import { DormReview } from './DormReview';
import { Totalscore } from './db/totalscore-schema';
import { CreateDormRequest } from './dtos/request/create-dorm-request.dto';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { DormEntityRepository } from './db/dorm-entity.repository';
import { Dorm } from './Dorm';
import { DormReviewEntityRepository } from './db/dormReview-entity.repository';

CreateDormReviewDto;

@Injectable()
export class DormReviewFactory implements EntityFactory<DormReview> {
  constructor(private readonly dormReviewEntityRepository: DormReviewEntityRepository) {}

  async create(userId, { dormId, textReview }: CreateDormReviewDto): Promise<DormReview> {
    const newDormReview = new DormReview(new mongoose.Types.ObjectId().toHexString(), dormId, userId, textReview);
    await this.dormReviewEntityRepository.create(newDormReview);
    return newDormReview;
  }
}
