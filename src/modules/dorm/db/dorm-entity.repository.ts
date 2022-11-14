import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { Dorm } from '../Dorm';
import { FilterOptionsDto } from '../dtos/request/filterOptions-query';
import { DormSchema } from './dorm-schema';
import { DormSchemaFactory } from './dorm-schema.factory';
import { FilterQuery, Model, Types } from 'mongoose';

@Injectable()
export class DormEntityRepository extends BaseEntityRepository<DormSchema, Dorm> {
  constructor(
    @InjectModel(DormSchema.name) private readonly dormModel: Model<DormSchema>,
    dormSchemaFactory: DormSchemaFactory,
  ) {
    super(dormModel, dormSchemaFactory);
  }

  // TODO: Please fix this <any> to some type
  async findByFilterOptions(fileterOption: FilterOptionsDto): Promise<any[]> {
    // console.log(fileterOption);
    const minMonthly = fileterOption.monthly[0];
    const maxMonthly = fileterOption.monthly[1];
    //console.log(maxMonthly);
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
    //console.log(dorms);
    const listHave = [];
    for (let i = 0; i < fileterOption.facilities.length; i++) {
      if (fileterOption.facilities[i].value == true) {
        listHave.push(fileterOption.facilities[i]);
      }
    }
    const listDorm = [];
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

    return listDorm;
  }
}
