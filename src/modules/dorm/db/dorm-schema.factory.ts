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
      tel: dorm.getTel(),
      address: dorm.getAddress(),
      room: dorm.getRoom(),
      imagePath: dorm.getImagePath(),
      zone: dorm.getZone(),
      bills: dorm.getBills(),
      facilities: dorm.getFacilities(),
      totalScore: dorm.getTotalScore(),
      rangePrice: dorm.getRangePrice(),
    };
  }

  createFromSchema(dormSchema: DormSchema): Dorm {
    return new Dorm(dormSchema._id.toString(), dormSchema.name);
  }
}
