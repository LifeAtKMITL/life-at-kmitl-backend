import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Dorm } from '../Dorm';
import { DormSchema } from './dorm-schema';
import { DormSchemaFactory } from './dorm-schema.factory';

@Injectable()
export class DormEntityRepository extends BaseEntityRepository<DormSchema, Dorm> {
  constructor(@InjectModel(DormSchema.name) dormModel: Model<DormSchema>, dormSchemaFactory: DormSchemaFactory) {
    super(dormModel, dormSchemaFactory);
  }
}
