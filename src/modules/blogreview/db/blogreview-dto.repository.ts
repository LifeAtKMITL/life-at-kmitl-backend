import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogreviewDto } from '../dtos/blogreview.dto';
import { BlogreviewsDto } from '../dtos/blogreviews.dto';
import { BlogreviewSchema } from './blogreview-schema';

@Injectable()
export class BlogreviewDtoRepository {
  constructor(@InjectModel(BlogreviewSchema.name) private readonly blogreviewModel: Model<BlogreviewSchema>) {}

  // DESC: find all
  async findAll(): Promise<any[]> {
    const blogreviews = await this.blogreviewModel.find({}, {}, { lean: true });
    return blogreviews.map((blogreview) => {
      return {
        userId: blogreview.userID,
        textSubjectReview: blogreview.textSubjectReview,
        subjectID: blogreview.subjectID,
        rate: blogreview.rate,
        date: blogreview.date,
      };
    });
  }

  // DESC: Filter by userID
  async findById(id: string): Promise<BlogreviewDto> {
    const blogreview = await this.blogreviewModel.findOne({ userID: id }, {}, { lean: true });
    return blogreview;
  }
}
