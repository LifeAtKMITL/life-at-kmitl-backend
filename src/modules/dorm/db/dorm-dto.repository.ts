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

  async findByFilterOptions(fileterOption: any): Promise<any> {
    console.log(fileterOption);
    let minMonthly = fileterOption.monthly[0];
    let maxMonthly = fileterOption.monthly[1];
    let { aircon, furniture, waterHeater, fan, TV, fridge, parking, freeWifi, keyCard, CCTV, luandry } = fileterOption;

    const dorms = await this.dormModel.find(
      {
        $and: [
          { zone: { $in: fileterOption.zone } },
          { rangePrice: { $elemMatch: { $gte: minMonthly, $lte: maxMonthly } } },
          {},
        ],
      },
      {},
      { lean: true },
    );
    return dorms.map((dorm) => {
      console.log(dorm.name);
      console.log(dorm.rangePrice);
      //console.log(dorm.facilities);
      return dorm;
    });
  }
}
