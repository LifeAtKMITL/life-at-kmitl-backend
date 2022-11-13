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
    private readonly secPair: string,
    private readonly lectOrPrac: string,
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

  getSecPair(): string {
    return this.secPair;
  }

  getLectOrPrac(): string {
    return this.lectOrPrac;
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

    // console.log(subject.getName(), classDateTimeSubj);

    if (
      this.dateRangeOverlaps(classDateTime.start, classDateTime.end, classDateTimeSubj.start, classDateTimeSubj.end)
    ) {
      // console.log('class overlaps');
      return false;
    }

    if (this.getMidtermDateTime() !== null && subject.getMidtermDateTime() !== null) {
      if (
        this.dateRangeOverlaps(
          new Date(this.midtermDateTime.start),
          new Date(this.midtermDateTime.end),
          new Date(subject.getMidtermDateTime().start),
          new Date(subject.getMidtermDateTime().end),
        )
      ) {
        // console.log('midterm overlaps');
        return false;
      }
    }
    if (this.getFinalDateTime() !== null && subject.getFinalDateTime() !== null) {
      if (
        this.dateRangeOverlaps(
          new Date(this.finalDateTime.start),
          new Date(this.finalDateTime.end),
          new Date(subject.getFinalDateTime().start),
          new Date(subject.getFinalDateTime().end),
        )
      ) {
        // console.log('final overlaps');
        return false;
      }
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

  classDateTimeToString(): string {
    const [date, time] = this.classDateTime.split(' ');
    let finalDate = '';
    if (date === '2020-03-01' || date === '2020-03-1' || date === '2020-3-1') {
      finalDate = 'Sunday, ';
    } else if (date === '2020-03-02' || date === '2020-03-2' || date === '2020-3-2') {
      finalDate = 'Monday, ';
    } else if (date === '2020-03-03' || date === '2020-03-3' || date === '2020-3-3') {
      finalDate = 'Tuesday, ';
    } else if (date === '2020-03-04' || date === '2020-03-4' || date === '2020-3-4') {
      finalDate = 'Wednesday, ';
    } else if (date === '2020-03-05' || date === '2020-03-5' || date === '2020-3-5') {
      finalDate = 'Thursday, ';
    } else if (date === '2020-03-06' || date === '2020-03-6' || date === '2020-3-6') {
      finalDate = 'Friday, ';
    } else if (date === '2020-03-07' || date === '2020-03-7' || date === '2020-3-7') {
      finalDate = 'Saturday, ';
    }
    return `${finalDate}${time.split('-').join(' - ')}`;
  }

  examDateTimeToString(dateTime: IDateTime): string {
    if (dateTime.start === null) {
      return null;
    }
    const date = new Date(dateTime.start);
    const noDate = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const startTime = dateTime.start.split(' ')[1].slice(0, 5);
    const endTime = dateTime.end.split(' ')[1].slice(0, 5);

    let dateExt: string;
    switch (noDate.toString().at(-1)) {
      case '1':
        dateExt = 'st';
        break;
      case '2':
        dateExt = 'nd';
        break;
      case '3':
        dateExt = 'rd';
        break;
      default:
        dateExt = 'th';
        break;
    }

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${noDate}${dateExt} ${months[month]} ${year}, ${startTime} - ${endTime}`;
  }
}
