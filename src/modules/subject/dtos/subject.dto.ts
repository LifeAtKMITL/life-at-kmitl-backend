import { IDateTime } from '../subject.types';

export class SubjectDto {
  readonly subjectId: string;
  readonly name: string;
  readonly sec: string;
  readonly credit: number;
  readonly teachers: string;
  readonly classDateTime: string;
  readonly midtermDateTime: IDateTime;
  readonly finalDateTime: IDateTime;
  readonly classDateTime_v: string;
  readonly midtermDateTime_v: string;
  readonly finalDateTime_v: string;
}
