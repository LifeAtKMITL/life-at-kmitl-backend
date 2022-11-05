import { DormDtoRepository } from '../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterOptionsDto } from '../dtos/request/filterOptions-query';

export class DormsByFilterOptionsQuery {
  constructor(public readonly filterOptions: FilterOptionsDto) {}
}

@QueryHandler(DormsByFilterOptionsQuery)
export class DormsByFilterOptionsQueryHandler implements IQueryHandler<DormsByFilterOptionsQuery> {
  constructor(private readonly dormDtoRepository: DormDtoRepository) {}

  async execute({ filterOptions }: DormsByFilterOptionsQuery): Promise<any> {
    return this.dormDtoRepository.findByFilterOptions(filterOptions);
  }
}
