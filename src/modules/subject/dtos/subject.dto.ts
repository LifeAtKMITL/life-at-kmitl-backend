import { IExamDateTime } from '../subject.types';

export class SubjectDto {
  readonly subjectId: string;
  readonly name: string;
  readonly sec: string;
  readonly classDateTime: string;
  readonly midtermDateTime: IExamDateTime;
  readonly finalDateTime: IExamDateTime;
  readonly credit: number;
  readonly teachers: string;
}
