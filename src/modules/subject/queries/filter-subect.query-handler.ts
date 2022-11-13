import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { remove } from 'lodash';
import { GenEdRepository } from '../db/gened.repository';
import { SubjectDtoFactory } from '../db/subject-dto.factory';
import { SubjectEntityRepository } from '../db/subject-entity.repository';
import { FilterSubjectRequest } from '../dtos/request/filter-subject-request.dto';
import { SubjectDto } from '../dtos/subject.dto';
import { Subject } from '../Subject';

export class FilterSubjectQuery {
  constructor(public readonly filterSubjectRequest: FilterSubjectRequest[]) {}
}

@QueryHandler(FilterSubjectQuery)
export class FilterSubjectQueryHandler implements IQueryHandler {
  constructor(
    private readonly subjectEntityRepository: SubjectEntityRepository,
    private readonly genedEntityRepository: GenEdRepository,
    private readonly subjectDtoFactory: SubjectDtoFactory,
  ) {}

  async execute({ filterSubjectRequest }: FilterSubjectQuery): Promise<SubjectDto[]> {
    const requestSubjects: Subject[] = [];
    for (let i = 0; i < filterSubjectRequest.length; i++) {
      let subject: Subject = null;
      try {
        subject = await this.subjectEntityRepository.findByIdAndSec(
          filterSubjectRequest[i].subjectId,
          filterSubjectRequest[i].sec,
        );
      } catch (e) {
        subject = await this.genedEntityRepository.findByIdAndSec(
          filterSubjectRequest[i].subjectId,
          filterSubjectRequest[i].sec,
        );
      }
      requestSubjects.push(subject);
    }

    const allSubjects = await this.genedEntityRepository.findAll();
    const removeSubjects: Subject[] = [];
    for (let i = 0; i < requestSubjects.length; i++) {
      for (let j = 0; j < allSubjects.length; j++) {
        if (requestSubjects[i].checkAvailability(allSubjects[j]) === false) {
          removeSubjects.push(allSubjects[j]);
        }
      }
    }

    removeSubjects.forEach((currSubject) => {
      remove(allSubjects, (subject) => {
        return subject.getSubjectId() === currSubject.getSubjectId() && subject.getSec() === currSubject.getSec();
      });
    });

    console.log(allSubjects.length);

    return this.subjectDtoFactory.create(allSubjects);
  }
}
