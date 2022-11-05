import { DormsDto } from './../dtos/request/dorms.dto';
import { DormDtoRepository } from './../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class DormsQuery {}

@QueryHandler(DormsQuery)
export class DormsQueryHandler implements IQueryHandler<DormsQuery> {
  constructor(private readonly dormDtoRepository: DormDtoRepository) {}

  async execute(): Promise<DormsDto[]> {
    return this.dormDtoRepository.findAll();
  }
}
