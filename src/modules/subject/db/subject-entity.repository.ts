import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Subject } from '../Subject';
import { SubjectSchema } from './subject-schema';
import { SubjectSchemaFactory } from './subject-schema.factory';

@Injectable()
export class SubjectEntityRepository extends BaseEntityRepository<SubjectSchema, Subject> {
  constructor(
    @InjectModel(SubjectSchema.name) subjectModel: Model<SubjectSchema>,
    subjectSchemaFactory: SubjectSchemaFactory,
  ) {
    super(subjectModel, subjectSchemaFactory);
  }

  async findOneBySubjectId(subjectId: string): Promise<Subject> {
    return this.findOne({ subjectId: subjectId } as FilterQuery<SubjectSchema>);
  }
}
