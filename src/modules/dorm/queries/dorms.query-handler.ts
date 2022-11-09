import { DormsDto } from './../dtos/request/dorms.dto';
import { DormDtoRepository } from './../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DormEntityRepository } from '../db/dorm-entity.repository';

export class DormsQuery {}

@QueryHandler(DormsQuery)
export class DormsQueryHandler implements IQueryHandler<DormsQuery> {
  constructor(
    private readonly dormDtoRepository: DormDtoRepository,
    private readonly dormRepository: DormEntityRepository,
  ) {}

  async execute(): Promise<any[]> {
    const dorms = await this.dormRepository.findAll();
    return dorms.map((dorm) => {
      const temp = {
        ...dorm,
        avgScore: dorm.getAvgScore(),
      };
      return temp;
    });
    // return this.dormRepository.findAll();
  }
}
