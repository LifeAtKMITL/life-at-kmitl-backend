export interface SubjectProps {
  subjectId: string;
  name: string;
  classDateTime: string;
  midtermDateTime: IDateTime;
  finalDateTime: IDateTime;
  sec: string;
  secPair: string;
  lectOrPrac: string;
  credit: number;
  teachers: string;
}

export interface IDateTime {
  start: string;
  end: string;
}
