import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Blogreview } from '../Blogreview';
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
  async findById(userId: string): Promise<any> {
    const blogreview = await this.blogreviewModel.find({ _id: userId }, {}, { lean: true });
    return blogreview;
  }
}
