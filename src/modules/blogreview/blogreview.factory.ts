import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { BlogreviewEntityRepository } from './db/blogreview-entity.repository';
import { Blogreview } from './Blogreview';
import { BlogreviewProps } from './blogreview.types';

@Injectable()
export class BlogreviewFactory implements EntityFactory<Blogreview> {
  constructor(private readonly BlogreviewEntityRepository: BlogreviewEntityRepository) {}

  async create({ subjectId, textSubjectReview, userId, userName, userId_Liked, rate, date }: BlogreviewProps): Promise<Blogreview> {
    const newBlogreview = new Blogreview(new mongoose.Types.ObjectId().toHexString(), subjectId, textSubjectReview, 
    userId, userName, userId_Liked, rate, date);
    await this.BlogreviewEntityRepository.create(newBlogreview);
    return newBlogreview;
  }
}
