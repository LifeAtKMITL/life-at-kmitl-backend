import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GenEdRepository } from '../db/gened.repository';
import { SubjectDtoRepository } from '../db/subject-dto.repository';
import { SubjectsDto } from '../dtos/subjects.dto';

export class SubjectsQuery {
  constructor() {
    //do nothing
  }
}

@QueryHandler(SubjectsQuery)
export class SubjectsQueryHandler implements IQueryHandler<SubjectsQuery> {
  constructor(
    private readonly subjectDtoRepository: SubjectDtoRepository,
    private readonly genedRepository: GenEdRepository,
  ) {}

  async execute(): Promise<SubjectsDto[]> {
    const allSubjects = await this.subjectDtoRepository.findAll();
    const allGenEdSubjects = await this.genedRepository.findAllQuery();

    return this.uniq_fast([...allSubjects, ...allGenEdSubjects]);
  }

  private uniq_fast(a: SubjectsDto[]): SubjectsDto[] {
    const seen = {};
    const out = [];
    const len = a.length;
    for (let i = 0; i < len; i++) {
      const item = a[i];
      if (seen[item.subjectId] !== 1) {
        seen[item.subjectId] = 1;
        out.push(item);
      }
    }
    return out;
  }
}
