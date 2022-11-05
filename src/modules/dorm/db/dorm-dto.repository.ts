import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { retry } from 'rxjs';
// import { SubjectDto } from '../dtos/subject.dto';
// import { SubjectsDto } from '../dtos/subjects.dto';
// import { SubjectSchema } from './subject-schema';
import { DormDto } from './../dtos/request/dorm.dto';
import { DormsDto } from './../dtos/request/dorms.dto';
import { DormSchema } from './dorm-schema';
import * as _ from 'lodash';

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
    const dorm = await this.dormModel.findOne({ _id: new Types.ObjectId(id) } as FilterQuery<DormSchema>);
    return dorm;
  }

  async findByFilterOptions(fileterOption: any): Promise<any> {
    // console.log(fileterOption);
    let minMonthly = fileterOption.monthly[0];
    let maxMonthly = fileterOption.monthly[1];
    const dorms = await this.dormModel.find(
      {
        $and: [
          { zone: { $in: fileterOption.zone } },
          { rangePrice: { $elemMatch: { $gte: minMonthly, $lte: maxMonthly } } },
        ],
      },
      {},
      { lean: true },
    );
    let listHave = [];
    for (let i = 0; i < fileterOption.facilities.length; i++) {
      if (fileterOption.facilities[i].value == true) {
        listHave.push(fileterOption.facilities[i]);
      }
    }
    let listDorm = [];
    dorms.map((dorm) => {
      let countHave = 0;
      for (let i = 0; i < listHave.length; i++) {
        for (let j = 0; j < dorm.facilities.length; j++) {
          if (_.isEqual(dorm.facilities[j], listHave[i])) {
            countHave += 1;
            break;
          }
        }
      }
      if (countHave == listHave.length) {
        listDorm.push(dorm);
      }
    });
    // console.log(listDorm);
    return listDorm;
  }
}
