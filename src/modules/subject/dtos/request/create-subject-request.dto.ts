import { IExamDateTime } from '../../subject.types';

export class CreateSubjectRequest {
  subjectId: string;
  name: string;
  classDateTime: string;
  midtermDateTime: IExamDateTime;
  finalDateTime: IExamDateTime;
  sec: string;
  credit: number;
  teachers: string;
}
