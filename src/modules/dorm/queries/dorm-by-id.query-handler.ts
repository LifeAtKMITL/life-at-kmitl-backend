import { DormDto } from './../dtos/request/dorm.dto';
import { DormDtoRepository } from './../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { SubjectDtoRepository } from '../db/dorm-dto.repository';
// import { SubjectDto } from '../dtos/subject.dto';

export class DormByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(DormByIdQuery)
export class DormByIdQueryHandler implements IQueryHandler {
  constructor(private readonly dormDtoRepository: DormDtoRepository) {}

  async execute({ id }: DormByIdQuery): Promise<DormDto> {
    return this.dormDtoRepository.findById(id);
  }
}
