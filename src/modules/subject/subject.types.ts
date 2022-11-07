export interface SubjectProps {
  subjectId: string;
  name: string;
  classDateTime: string;
  midtermDateTime: IExamDateTime;
  finalDateTime: IExamDateTime;
  sec: string;
  credit: number;
  teachers: string;
}

export interface IExamDateTime {
  start: string;
  end: string;
}
