import { AggregateRoot } from '@nestjs/cqrs';
import { IDateTime } from './subject.types';

export class Subject extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly subjectId: string,
    private readonly name: string,
    private readonly classDateTime: string,
    private readonly midtermDateTime: IDateTime,
    private readonly finalDateTime: IDateTime,
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

  getMidtermDateTime(): IDateTime {
    return this.midtermDateTime;
  }

  getFinalDateTime(): IDateTime {
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

  public checkAvailability(subject: Subject): boolean {
    const parsedDate = this.parseClassDateTime(this.classDateTime);
    const classDateTime = {
      start: parsedDate[0],
      end: parsedDate[1],
    };

    const parsedDateSubj = this.parseClassDateTime(subject.getClassDateTime());
    const classDateTimeSubj = {
      start: parsedDateSubj[0],
      end: parsedDateSubj[1],
    };

    if (
      this.dateRangeOverlaps(classDateTime.start, classDateTime.end, classDateTimeSubj.start, classDateTimeSubj.end)
    ) {
      // console.log('class overlaps');
      return false;
    }
    if (
      this.midtermDateTime !== null ||
      (subject.getMidtermDateTime() !== null &&
        this.dateRangeOverlaps(
          new Date(this.midtermDateTime.start),
          new Date(this.midtermDateTime.end),
          new Date(subject.getMidtermDateTime().start),
          new Date(subject.getMidtermDateTime().end),
        ))
    ) {
      // console.log('midterm overlaps');
      return false;
    }
    if (
      this.finalDateTime !== null ||
      (subject.getFinalDateTime() !== null &&
        this.dateRangeOverlaps(
          new Date(this.finalDateTime.start),
          new Date(this.finalDateTime.end),
          new Date(subject.getFinalDateTime().start),
          new Date(subject.getFinalDateTime().end),
        ))
    ) {
      // console.log('final overlaps');
      return false;
    }

    return true;
  }

  private dateRangeOverlaps(a_start: Date, a_end: Date, b_start: Date, b_end: Date): boolean {
    if (a_start < b_start && b_start < a_end) return true; // b starts in a
    if (a_start < b_end && b_end < a_end) return true; // b ends in a
    if (b_start < a_start && a_end < b_end) return true; // a in b
    if (b_start.getTime() === a_start.getTime() && a_end.getTime() === b_end.getTime()) return true; // a in b
    return false;
  }

  private parseClassDateTime(classDateTime: string): Date[] {
    const start = Date.parse(classDateTime.slice(0, 16));
    const end = Date.parse(`${classDateTime.slice(0, 10)} ${classDateTime.slice(17)}`);
    return [new Date(start + 25200000), new Date(end + 25200000)];
  }

  toString(): string {
    return `${this.subjectId} ${this.name} ${this.sec}\n class time: ${this.classDateTime}\n midterm date: ${this.midtermDateTime.start} ${this.midtermDateTime.end}\n final date: ${this.finalDateTime.start} ${this.finalDateTime.end}\n ${this.credit}`;
  }
}
