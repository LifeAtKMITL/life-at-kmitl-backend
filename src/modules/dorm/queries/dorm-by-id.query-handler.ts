import { Dorm } from './../Dorm';
import { DormEntityRepository } from './../db/dorm-entity.repository';
import { DormDto } from './../dtos/request/dorm.dto';
import { DormDtoRepository } from './../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';

export class DormByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(DormByIdQuery)
export class DormByIdQueryHandler implements IQueryHandler {
  constructor(
    private readonly dormDtoRepository: DormDtoRepository,
    private readonly dormRepository: DormEntityRepository,
  ) {}

  async execute({ id }: DormByIdQuery): Promise<any> {
    const dorm = await this.dormRepository.findOneById(id);
    const temp = {
      ...dorm,
      avgScore: dorm.getAvgScore(),
    };
    return temp;
    // return this.dormDtoRepository.findById(id);
  }
}
