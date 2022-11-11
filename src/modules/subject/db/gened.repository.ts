import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { SubjectDto } from '../dtos/subject.dto';
import { SubjectsDto } from '../dtos/subjects.dto';
import { Subject } from '../Subject';
import { GenEdSchema } from './gened-schema';
import { GenEdSchemaFactory } from './gened-schema.factory';

@Injectable()
export class GenEdRepository extends BaseEntityRepository<GenEdSchema, Subject> {
  constructor(@InjectModel(GenEdSchema.name) genedModel: Model<GenEdSchema>, genedSchemaFactory: GenEdSchemaFactory) {
    super(genedModel, genedSchemaFactory);
  }

  async findAllQuery(): Promise<SubjectsDto[]> {
    const subjects = await this.find({});
    return subjects.map((subject) => {
      return {
        subjectId: subject.getSubjectId(),
        name: subject.getName(),
      };
    });
  }
  async findOneBySubjectId(subjectId: string): Promise<Subject> {
    return this.findOne({ subjectId: subjectId } as FilterQuery<GenEdSchema>);
  }

  async findByIdAndSec(subjectId: string, sec: string): Promise<Subject> {
    return this.findOne({ subjectId: subjectId, sec: sec } as FilterQuery<GenEdSchema>);
  }
}
