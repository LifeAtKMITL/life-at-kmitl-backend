import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubjectDtoRepository } from '../db/subject-dto.repository';
import { SubjectByIdResponseDto } from '../dtos/subject-by-id-response.dto';

export class SubjectByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(SubjectByIdQuery)
export class SubjectByIdQueryHandler implements IQueryHandler {
  constructor(private readonly subjectDtoRepository: SubjectDtoRepository) {}

  async execute({ id }: SubjectByIdQuery): Promise<SubjectByIdResponseDto[]> {
    const foundSubjects = await this.subjectDtoRepository.findById(id);
    const ret: SubjectByIdResponseDto[] = [];
    foundSubjects.forEach((subject) => {
      if (subject.secPair && subject.lectOrPrac === 'ท') {
        const pairSubject = foundSubjects.find(({ sec }) => sec === subject.secPair);
        ret.push({
          theory: subject,
          lab: pairSubject,
        });
      } else if (subject.lectOrPrac === 'ท') {
        ret.push({
          theory: subject,
          lab: null,
        });
      }
    });
    return ret;
  }
}
