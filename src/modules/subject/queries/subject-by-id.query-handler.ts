import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubjectDtoRepository } from '../db/subject-dto.repository';
import { SubjectDto } from '../dtos/subject.dto';

export class SubjectByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(SubjectByIdQuery)
export class SubjectByIdQueryHandler implements IQueryHandler {
  constructor(private readonly subjectDtoRepository: SubjectDtoRepository) {}

  async execute({ id }: SubjectByIdQuery): Promise<SubjectDto[]> {
    return this.subjectDtoRepository.findById(id);
  }
}
