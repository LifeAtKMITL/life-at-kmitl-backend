import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { request } from 'http';
import { GenEdRepository } from '../db/gened.repository';
import { SubjectEntityRepository } from '../db/subject-entity.repository';
import { FilterSubjectRequest } from '../dtos/request/filter-subject-request.dto';
import { Subject } from '../Subject';

export class FilterSubjectQuery {
  constructor(public readonly filterSubjectRequest: FilterSubjectRequest[]) {}
}

@QueryHandler(FilterSubjectQuery)
export class FilterSubjectQueryHandler implements IQueryHandler {
  constructor(
    private readonly subjectEntityRepository: SubjectEntityRepository,
    private readonly genedEntityRepository: GenEdRepository,
  ) {}

  async execute({ filterSubjectRequest }: FilterSubjectQuery): Promise<any> {
    const requestSubjects: Subject[] = [];
    for (let i = 0; i < filterSubjectRequest.length; i++) {
      const subject = await this.subjectEntityRepository.findByIdAndSec(
        filterSubjectRequest[i].subjectId,
        filterSubjectRequest[i].sec,
      );
      requestSubjects.push(subject);
    }

    const allSubjects = await this.genedEntityRepository.findAll();
    requestSubjects.forEach((subject) => {
      console.log(`${subject.toString()}`);
      allSubjects.forEach((checkSubject) => {
        // console.log(`and ${checkSubject.toString()} ${subject.checkAvailability(checkSubject)}`);
        if (subject.checkAvailability(checkSubject)) {
        }
      });
    });
    return;
  }
}
