import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectsDto } from '../dtos/request/subjects.dto';
import { SubjectSchema } from './subject-schema';

@Injectable()
export class SubjectDtoRepository {
  constructor(@InjectModel(SubjectSchema.name) private readonly subjectModel: Model<SubjectSchema>) {}

  async findAll(): Promise<SubjectsDto[]> {
    const subjects = await this.subjectModel.find({}, {}, { lean: true });
    return subjects.map((subject) => {
      return { ...subject };
    });
  }
}
