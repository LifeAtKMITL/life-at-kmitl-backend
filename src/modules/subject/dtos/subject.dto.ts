import { IDateTime } from '../subject.types';

export class SubjectDto {
  readonly subjectId: string;
  readonly name: string;
  readonly sec: string;
  readonly classDateTime: string;
  readonly midtermDateTime: IDateTime;
  readonly finalDateTime: IDateTime;
  readonly credit: number;
  readonly teachers: string;
}
