import { Dorm } from './../Dorm';
import { DormDtoRepository } from '../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterOptionsDto } from '../dtos/request/filterOptions-query';
import { DormEntityRepository } from '../db/dorm-entity.repository';

export class DormsByFilterOptionsQuery {
  constructor(public readonly filterOptions: FilterOptionsDto) {}
}

@QueryHandler(DormsByFilterOptionsQuery)
export class DormsByFilterOptionsQueryHandler implements IQueryHandler<DormsByFilterOptionsQuery> {
  constructor(
    private readonly dormDtoRepository: DormDtoRepository,
    private readonly dormRepository: DormEntityRepository,
  ) {}

  async execute({ filterOptions }: DormsByFilterOptionsQuery): Promise<any> {
    const dorms = await this.dormRepository.findByFilterOptions(filterOptions);
    return dorms;
  }
}
