import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubjectDtoRepository } from '../db/subject-dto.repository';
import { SubjectsDto } from '../dtos/request/subjects.dto';

export class SubjectsQuery {}

@QueryHandler(SubjectsQuery)
export class SubjectsQueryHandler implements IQueryHandler<SubjectsQuery> {
  constructor(private readonly subjectDtoRepository: SubjectDtoRepository) {}

  async execute(): Promise<SubjectsDto[]> {
    return this.subjectDtoRepository.findAll();
  }
}
