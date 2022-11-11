import { SharenoteSchema } from './sharenote-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharenotesDto } from '../dtos/sharenotes.dto';
@Injectable()
export class SharenoteDtoRepository {
  constructor(
    @InjectModel(SharenoteSchema.name)
    private readonly sharenoteModel: Model<SharenoteSchema>,
  ) {}
  async findAll(): Promise<SharenotesDto[]> {
    const sharenotes = await this.sharenoteModel.find({}, {}, { lean: true });
    return sharenotes.map((sharenote) => {
      return {
        userId: sharenote.userId,
        subjectId: sharenote.subjectId,
        sharenoteCollectionName: sharenote.sharenoteCollectionName,
        sharenoteCollectionNameVersion: sharenote.sharenoteCollectionNameVersion,
        files: sharenote.files,
        likeCount: sharenote.likeCount,
        viewCount: sharenote.viewCount,
        teachers: sharenote.teachers,
        date: sharenote.date,
        exam: sharenote.exam,
        year: sharenote.year,
        description: sharenote.description,
      };
    });
  }

  // DESC: Filter Subject Collection by subjectId
  async findById(id: string): Promise<SharenotesDto[]> {
    const subject = await this.sharenoteModel.find({ userId: id }, {}, { lean: true });
    return subject;
  }
}
