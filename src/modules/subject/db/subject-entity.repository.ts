import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Subject } from '../Subject';
import { SubjectSchema } from './subject-schema';

@Injectable()
export class SubjectEntityRepository extends BaseEntityRepository<SubjectSchema, Subject> {
  //   constructor(
  //     @InjectModel(SubjectSchema.name) subjectModel: Model<SubjectSchema>,
  //     subjectSchemaFactory: SubjectSchemaFactory,
  //   ) {}
}
