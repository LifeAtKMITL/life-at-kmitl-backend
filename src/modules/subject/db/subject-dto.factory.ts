import { Injectable } from '@nestjs/common';
import { SubjectDto } from '../dtos/subject.dto';
import { Subject } from '../Subject';

@Injectable()
export class SubjectDtoFactory {
  async create(subjects: Subject[]): Promise<SubjectDto[]> {
    return subjects.map((subject) => {
      return {
        subjectId: subject.getSubjectId(),
        name: subject.getName(),
        sec: subject.getSec(),
        secPair: subject.getSecPair(),
        lectOrPrac: subject.getLectOrPrac(),
        classDateTime: subject.getClassDateTime(),
        midtermDateTime: subject.getMidtermDateTime(),
        finalDateTime: subject.getFinalDateTime(),
        credit: subject.getCredit(),
        teachers: subject.getTeachers(),
        classDateTime_v: subject.classDateTimeToString(),
        midtermDateTime_v: subject.examDateTimeToString(subject.getMidtermDateTime()),
        finalDateTime_v: subject.examDateTimeToString(subject.getFinalDateTime()),
      };
    });
  }
}
