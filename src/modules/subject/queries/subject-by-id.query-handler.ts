import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubjectDtoRepository } from '../db/subject-dto.repository';
import { SubjectByIdResponseDto } from '../dtos/subject-by-id-response.dto';
import { SubjectByIdAdapter } from '../adapters/subject-by-id/subject-by-id.adapter';

export class SubjectByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(SubjectByIdQuery)
export class SubjectByIdQueryHandler implements IQueryHandler {
  constructor(private readonly subjectDtoRepository: SubjectDtoRepository) {}

  async execute({ id }: SubjectByIdQuery): Promise<SubjectByIdResponseDto[]> {
    const adapter = new SubjectByIdAdapter(this.subjectDtoRepository);
    const res = adapter.getSubjectById(id);
    return res;
  }
}
