import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GenEdRepository } from '../db/gened.repository';
import { SubjectsDto } from '../dtos/subjects.dto';

export class AllGenEdQuery {}

@QueryHandler(AllGenEdQuery)
export class AllGenEdQueryHandler implements IQueryHandler {
  constructor(private readonly genedRepository: GenEdRepository) {}

  async execute(): Promise<SubjectsDto[]> {
    const allGenEds = await this.genedRepository.findAllQuery();
    return this.uniq_fast(allGenEds);
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
