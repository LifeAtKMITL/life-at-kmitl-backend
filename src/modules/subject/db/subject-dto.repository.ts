import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDto } from '../dtos/subject.dto';
import { SubjectsDto } from '../dtos/subjects.dto';
import { SubjectSchema } from './subject-schema';

@Injectable()
export class SubjectDtoRepository {
  constructor(@InjectModel(SubjectSchema.name) private readonly subjectModel: Model<SubjectSchema>) {}

  // DESC: find all subjects in Subject collection
  async findAll(): Promise<SubjectsDto[]> {
    const subjects = await this.subjectModel.find({}, {}, { lean: true });
    return subjects.map((subject) => {
      return {
        subjectId: subject.subjectId,
        name: subject.name,
      };
    });
  }

  // DESC: Filter Subject Collection by subjectId
  async findById(id: string): Promise<SubjectDto[]> {
    const subject = await this.subjectModel.find({ subjectId: id }, {}, { lean: true });
    return subject;
  }
}
