import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Dorm } from '../Dorm';
import { DormSchema } from './dorm-schema';

@Injectable()
export class DormSchemaFactory implements EntitySchemaFactory<DormSchema, Dorm> {
  create(dorm: Dorm): DormSchema {
    return {
      _id: new mongoose.Types.ObjectId(dorm.getId()),
      name: dorm.getName(),
      description: dorm.getDescription(),
    };
  }

  createFromSchema(dormSchema: DormSchema): Dorm {
    return new Dorm(dormSchema._id.toString(), dormSchema.name, dormSchema.description);
  }
}
