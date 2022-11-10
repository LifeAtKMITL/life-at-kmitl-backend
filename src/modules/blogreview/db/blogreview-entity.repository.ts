import { Blogreview } from './../Blogreview';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { BlogreviewSchema } from './blogreview-schema';
import { BlogreviewSchemaFactory } from './blogreview-schema.factory';

@Injectable()
export class BlogreviewEntityRepository extends BaseEntityRepository<BlogreviewSchema, Blogreview> {
  constructor(
    @InjectModel(BlogreviewSchema.name) private readonly blogreviewModel: Model<BlogreviewSchema>,
    blogreviewSchemaFactory: BlogreviewSchemaFactory,
  ) {
    super(blogreviewModel, blogreviewSchemaFactory);
  }

  // DESC: Filter by userID
  async findByUserId(userId: string): Promise<Blogreview[]> {
    return await this.find({ userId: userId } as FilterQuery<BlogreviewSchema>);
  }
}
