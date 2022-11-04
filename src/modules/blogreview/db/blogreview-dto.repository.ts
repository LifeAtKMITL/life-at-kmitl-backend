import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogreviewDto } from '../dtos/blogreview.dto';
import { BlogreviewsDto } from '../dtos/blogreviews.dto';
import { BlogreviewSchema } from './blogreview-schema';

@Injectable()
export class BlogreviewDtoRepository {
  constructor(@InjectModel(BlogreviewSchema.name) private readonly blogreviewModel: Model<BlogreviewSchema>) {}

  // DESC: find all subjects in Subject collection
  async findAll(): Promise<BlogreviewsDto[]> {
    const blogreviews = await this.blogreviewModel.find({}, {}, { lean: true });
    return blogreviews.map((blogreview) => {
      return {
        userId: blogreview.userID,
        textSubjectReview: blogreview.textSubjectReview
      };
    });
  }

  // DESC: Filter Subject Collection by subjectId
  async findById(id: string): Promise<BlogreviewDto> {
    const subject = await this.blogreviewModel.findOne({ userID: id }, {}, { lean: true });
    return subject;
  }
}