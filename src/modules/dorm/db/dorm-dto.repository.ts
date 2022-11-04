import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { retry } from 'rxjs';
// import { SubjectDto } from '../dtos/subject.dto';
// import { SubjectsDto } from '../dtos/subjects.dto';
// import { SubjectSchema } from './subject-schema';
import { DormDto } from './../dtos/request/dorm.dto';
import { DormsDto } from './../dtos/request/dorms.dto';
import { DormSchema } from './dorm-schema';

@Injectable()
export class DormDtoRepository {
  constructor(@InjectModel(DormSchema.name) private readonly dormModel: Model<DormSchema>) {}

  // DESC: find all subjects in Subject collection
  async findAll(): Promise<any> {
    const dorms = await this.dormModel.find({}, {}, { lean: true });
    return dorms.map((dorm) => {
      return dorm;
    });
  }

  // DESC: Filter Dorm Collection by dormId
  async findById(id: string): Promise<any> {
    const dorm = await this.dormModel.findOne({ dormId: id }, {}, { lean: true });
    return dorm;
  }

  async getDormByFilterOptions(fileterOption: Object): Promise<any> {
    return 1;
  }
}
