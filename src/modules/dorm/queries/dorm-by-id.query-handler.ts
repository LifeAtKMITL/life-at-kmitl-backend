import { DormDto } from './../dtos/request/dorm.dto';
import { DormDtoRepository } from './../db/dorm-dto.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
