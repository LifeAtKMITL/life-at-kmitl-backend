import { IDateTime } from '../../subject.types';

export class CreateSubjectRequest {
  subjectId: string;
  name: string;
  classDateTime: string;
  midtermDateTime: IDateTime;
  finalDateTime: IDateTime;
  sec: string;
  credit: number;
  teachers: string;
}
