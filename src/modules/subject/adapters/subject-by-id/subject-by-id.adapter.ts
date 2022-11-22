import { SubjectDtoRepository } from '../../db/subject-dto.repository';
import { SubjectByIdResponseDto } from '../../dtos/subject-by-id-response.dto';

export interface ISubjectByIdAdapter {
  getSubjectById(id: string): Promise<SubjectByIdResponseDto[]>;
}

export class SubjectByIdAdapter implements ISubjectByIdAdapter {
  constructor(private readonly subjectDtoRepository: SubjectDtoRepository) {}

  async getSubjectById(id: string): Promise<SubjectByIdResponseDto[]> {
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
      } else if (subject.lectOrPrac === 'ป' && subject.secPair === null) {
        ret.push({
          theory: null,
          lab: subject,
        });
      }
    });
    return ret;
  }
}
