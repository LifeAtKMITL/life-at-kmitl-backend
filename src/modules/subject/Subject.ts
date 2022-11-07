import { AggregateRoot } from '@nestjs/cqrs';
import { IExamDateTime } from './subject.types';

export class Subject extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly subjectId: string,
    private readonly name: string,
    private readonly classDateTime: string,
    private readonly midtermDateTime: IExamDateTime,
    private readonly finalDateTime: IExamDateTime,
    private readonly sec: string,
    private readonly credit: number,
    private readonly teachers: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getSubjectId(): string {
    return this.subjectId;
  }

  getName(): string {
    return this.name;
  }

  getClassDateTime(): string {
    return this.classDateTime;
  }

  getMidtermDateTime(): IExamDateTime {
    return this.midtermDateTime;
  }

  getFinalDateTime(): IExamDateTime {
    return this.finalDateTime;
  }

  getSec(): string {
    return this.sec;
  }

  getCredit(): number {
    return this.credit;
  }

  getTeachers(): string {
    return this.teachers;
  }
}
