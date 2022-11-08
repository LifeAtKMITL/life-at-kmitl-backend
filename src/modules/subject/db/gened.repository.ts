import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
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
}
