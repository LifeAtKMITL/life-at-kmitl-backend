import { AggregateRoot } from '@nestjs/cqrs';

export class Subject extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly subjectId: string,
    private readonly name: string,
    private readonly classDateTime: string,
    private readonly midtermDateTime: string,
    private readonly finalDateTime: string,
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

  getMidtermDateTime(): string {
    return this.midtermDateTime;
  }

  getFinalDateTime(): string {
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
