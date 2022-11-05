import { DormsDto } from '../dtos/request/dorms.dto';
import { DormDtoRepository } from '../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { SubjectDtoRepository } from '../db/dorm-dto.repository';
// import { SubjectsDto } from '../dtos/subjects.dto';

export class DormsByFilterOptionsQuery {
  constructor(public readonly filterOptions: Object) {}
}

@QueryHandler(DormsByFilterOptionsQuery)
export class DormsByFilterOptionsQueryHandler implements IQueryHandler<DormsByFilterOptionsQuery> {
  constructor(private readonly dormDtoRepository: DormDtoRepository) {}

  async execute({ filterOptions }: DormsByFilterOptionsQuery): Promise<any> {
    //console.log(filterOptions);
    return this.dormDtoRepository.findByFilterOptions(filterOptions);
  }
}
